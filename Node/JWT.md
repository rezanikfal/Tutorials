# JWT Authentication with Passport in an Express.js + Mongoose Application

JWT (JSON Web Token) authentication is a popular approach for securing APIs in modern web applications. In this advanced tutorial, we'll implement a **code-focused, modular authentication system** using **Passport.js** (with the JWT strategy) in an **Express.js** application, with **MongoDB/Mongoose** for data storage. We will cover the core authentication logic, including: user registration and login, password hashing with bcrypt, issuing JWT access tokens, implementing refresh tokens (with secure storage and rotation), and protecting routes with Passport. The basic app setup (like initializing Express or connecting to MongoDB) is assumed to be already done.

**What We'll Implement:**

- **Mongoose User Model** – with hashed password storage using bcrypt (never store plaintext passwords) ([Password Hashing using bcrypt. What is bcrypt? | by Bhupendra | Medium](https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09#:~:text=Best%20practices%20recommend%20never%20storing,hash%20and%20store%20them%20safely)).  
- **Passport JWT Strategy** – configuration to verify JWTs from requests (using a secret key and extracting the token from headers) ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=,a%20function%20with%20two%20parameters)).  
- **Registration and Login Endpoints** – to create new users and issue JWT access + refresh tokens upon login.  
- **JWT Generation & Verification** – using the **jsonwebtoken** library for signing tokens and Passport for verifying them.  
- **Refresh Token Handling** – issuing refresh tokens, storing them securely (in a DB or via HTTP-only cookies), and implementing **refresh token rotation** to invalidate used tokens ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=The%20refresh%20token%20rotation%20technique,generated%20tokens%20to%20the%20client)).  
- **Protected Routes Middleware** – using Passport’s JWT authentication middleware to guard routes (no sessions, JWT is stateless) ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=In%20the%20,basic)).  
- **Secure Practices** – including appropriate token expiration times, secret key management, and bcrypt usage guidelines.

By the end, you'll have a clear, working example of a robust JWT authentication flow in Node.js, organized with a modular structure (separate files for models, controllers, routes, etc.), ready for use in an Express API.

 ([image]()) *Figure: Simplified JWT authentication flow with access and refresh tokens. The client first logs in and receives an **access token** (short-lived) and a **refresh token**. It uses the access token in the `Authorization` header for subsequent protected requests. When the access token expires (or is about to expire), the client can send the refresh token to request a new access token (and a new refresh token) without requiring the user to log in again – implementing a secure refresh token rotation strategy, where each refresh token is single-use.*

## User Model with Hashed Password (Mongoose)

We start by defining a **User model** in Mongoose, which includes fields for the user's email and password. We will use **bcrypt** to hash passwords before saving to the database, so that plaintext passwords are never stored (a critical security practice) ([Password Hashing using bcrypt. What is bcrypt? | by Bhupendra | Medium](https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09#:~:text=Best%20practices%20recommend%20never%20storing,hash%20and%20store%20them%20safely)). Bcrypt will also be used to verify passwords during login. In the schema below, we use a Mongoose pre-save hook to hash the password whenever a new user is created or an existing password is changed.

```js
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String, required: true, unique: true, lowercase: true,
  },
  password: {
    type: String, required: true,
  }
}, { timestamps: true });

// Hash the password before saving the user document
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next(); // Only hash if password is new or was modified
    }
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);  // 10 salt rounds (typical is 10-12) ([Password Hashing using bcrypt. What is bcrypt? | by Bhupendra | Medium](https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09#:~:text=,hardcode%20salts%20in%20your%20code))
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Instance method to validate password during login
UserSchema.methods.isValidPassword = async function(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
```

**Explanation:** In this model, the `email` field is marked as `unique: true` to prevent duplicate registrations. The pre-save hook uses `bcrypt.genSalt()` and `bcrypt.hash()` to replace the plaintext `this.password` with a hashed version before the user is saved. We also define an `isValidPassword` method on the schema, which uses `bcrypt.compare()` to check a given plaintext password against the stored hash. By following this approach, we ensure that user passwords are stored securely (hashed with salt) and never in plain text ([Password Hashing using bcrypt. What is bcrypt? | by Bhupendra | Medium](https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09#:~:text=Best%20practices%20recommend%20never%20storing,hash%20and%20store%20them%20safely)).

*Why Bcrypt?* Bcrypt is a battle-tested hashing algorithm that automatically salts passwords and is intentionally slow, which helps protect against brute-force attacks ([Password Hashing using bcrypt. What is bcrypt? | by Bhupendra | Medium](https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09#:~:text=,even%20as%20attackers%E2%80%99%20resources%20improve)) ([Password Hashing using bcrypt. What is bcrypt? | by Bhupendra | Medium](https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09#:~:text=,hardcode%20salts%20in%20your%20code)). Using ~10 salt rounds (as we did above) is a common practice that balances security and performance ([Password Hashing using bcrypt. What is bcrypt? | by Bhupendra | Medium](https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09#:~:text=,hardcode%20salts%20in%20your%20code)).

## Configuring Passport JWT Strategy

Next, we configure Passport.js to use a **JWT strategy** for authenticating requests. Passport provides the `passport-jwt` module for this. We will set it up to **extract JWTs from the Authorization header** and to **verify tokens using our secret key**. When a valid token is presented, the strategy will retrieve the corresponding user from the database and attach it to the `req` object.

```js
// config/passport.js
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

// Options for JWT strategy
const opts = {
  // Extract JWT from the Authorization header as a Bearer token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Use the secret key to verify the token's signature
  secretOrKey: process.env.JWT_SECRET,
  // (Optional) issuer and audience can be checked here as well for extra validation
};

// Configure the JWT strategy
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    // jwt_payload is the decoded JWT (we'll include user ID in it when signing)
    const user = await User.findById(jwt_payload.id);
    if (user) {
      // If user is found, authentication succeeds
      return done(null, user);
    } else {
      // If no user found with that ID, fail authentication
      return done(null, false);
    }
  } catch (error) {
    // In case of error (e.g., database issue), fail with error
    return done(error, false);
  }
}));

module.exports = passport;
```

In the code above, we initialize a new `JwtStrategy` with an options object and a verification function. Key points:

- **`jwtFromRequest`** specifies how to find the token in incoming requests. We use `ExtractJwt.fromAuthHeaderAsBearerToken()`, which looks for an `Authorization: Bearer <token>` header ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=,extractor)).
- **`secretOrKey`** provides the secret key that was used to sign the JWT. Passport-JWT will use this to verify the token’s signature ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=,a%20function%20with%20two%20parameters)). (We store the actual secret in an environment variable for security – more on that later.)
- The **verify callback** is an async function that receives `jwt_payload` (the decoded token payload) and a `done` callback. Our JWT will contain the user’s ID (`jwt_payload.id`). We attempt to find a user in the database with that ID:
  - If a user is found, we call `done(null, user)` – Passport then attaches this `user` object to `req.user` for use in the request handler ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=In%20the%20,_id%3A%20payload.id)).
  - If no user is found, we call `done(null, false)` – this indicates an invalid token (authentication will fail) ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=If%20the%20,value%20for%20the%20user)).
  - If there's a database error, we call `done(error, false)` to abort the authentication.

Finally, we export the configured `passport`. In your main application file, make sure to include `app.use(passport.initialize())` to initialize Passport. Also, when protecting routes (as we'll see), we'll specify `{ session: false }` because we are not using session cookies (JWT is stateless authentication) ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=In%20the%20,basic)).

## Registration Endpoint (User Sign-Up)

For user registration, we'll create an Express route and controller that allows new users to sign up. This endpoint will accept user details (e.g., email and password), create a new user in MongoDB, and return a success response. (We will not automatically issue a token upon registration in this example, to keep the flow clear – the user will log in to get a token.)

**Route Definition:** In a dedicated routes file (e.g. `routes/auth.js`), define the register route and attach it to the controller logic:

```js
// routes/auth.js (Excerpt)
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
// ... (we will add login and refresh routes later)

module.exports = router;
```

**Controller Logic:** Now, implement the `register` controller in `controllers/authController.js`. This will create a new user using the Mongoose model defined earlier:

```js
// controllers/authController.js (Excerpt)
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already taken" });
    }
    // Create and save the new user (password will be hashed by the model hook)
    const user = new User({ email, password });
    await user.save();
    // Return success (omit password in response)
    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
```

**What this does:** The controller receives `email` and `password` from the request body. It first checks if a user with that email exists to prevent duplicates. If yes, it responds with HTTP 400 Bad Request. If not, it creates a new `User` instance and saves it. Our Mongoose pre-save hook will automatically hash the password before storing. On success, we respond with 201 Created and return the new user's ID and email (it's a good practice not to return the hashed password or other sensitive info).

At this point, the user account is created. The client can then proceed to log in with those credentials to obtain a JWT.

## Login Endpoint & JWT Generation

The login endpoint authenticates a user and issues a **JWT access token** and a **refresh token** upon successful login. This is a critical part of the flow: the user sends credentials, we verify them, and then respond with tokens that the client will use for subsequent requests.

**Route Definition:** Add a login route in `routes/auth.js`:

```js
router.post('/login', authController.login);
```

**Controller Logic:** Implement the `login` controller in `controllers/authController.js`. We'll use the User model to verify the credentials, then use **jsonwebtoken** to generate a signed JWT. We will also generate a refresh token and store it for later use.

```js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshToken = require('../models/RefreshToken');  // we'll create this model next

// ... inside authController.js
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Check if the password is correct
    const passwordMatch = await user.isValidPassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // At this point, authentication is successful
    const payload = { id: user._id, email: user.email };
    // Sign an access token (short lifespan, e.g., 15 minutes)
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    // Generate a refresh token (longer lifespan, e.g., 7 days)
    const refreshTokenValue = crypto.randomBytes(40).toString('hex');  // random token string
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    // Store the refresh token in the database with association to the user
    await RefreshToken.create({ 
      token: refreshTokenValue, 
      user: user._id, 
      expiryDate: refreshTokenExpiry 
    });

    // Send the tokens to the client
    // (In a real app, you might set the refresh token as an Http-Only cookie instead)
    return res.json({
      accessToken: accessToken,
      refreshToken: refreshTokenValue,
      expiresIn: 900  // optional: 15 minutes in seconds
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
```

Let's break down what happens in the login logic:

1. **Verify Credentials:** We attempt to find a user by the provided email. If none is found, or if the password check fails, we return HTTP 401 Unauthorized (with a generic message to avoid revealing which part was wrong).
2. **Prepare JWT Payload:** If the credentials are valid, we construct a JWT payload. Here we include the user's ID and email. (You can include other non-sensitive info if needed, e.g., roles or permissions.)
3. **Sign Access Token:** We call `jwt.sign(payload, secret, { expiresIn })` to create a JWT. We use our secret key from the environment (via `process.env.JWT_SECRET`) and set an expiration time for the access token. It's recommended to keep access tokens short-lived (e.g., 15 minutes to 1 hour) ([5 JWT authentication best practices for Node.js apps  | Tech Tonic](https://medium.com/deno-the-complete-reference/5-jwt-authentication-best-practices-for-node-js-apps-f1aaceda3f81#:~:text=,in%20case%20of%20token%20theft)) to minimize the window of misuse if stolen.
4. **Generate Refresh Token:** We create a refresh token, which in this implementation is a random string (40 bytes hex = 80 characters). We decide on a longer expiration for refresh tokens (here 7 days). According to best practices, refresh tokens typically live from a day up to a week ([5 JWT authentication best practices for Node.js apps  | Tech Tonic](https://medium.com/deno-the-complete-reference/5-jwt-authentication-best-practices-for-node-js-apps-f1aaceda3f81#:~:text=,authenticate)). We then store this refresh token in the database along with the user reference and expiry. Storing refresh tokens in a database allows us to manage and revoke them, adding an extra layer of security (for example, on logout or token reuse, as we'll see).
5. **Response:** Finally, we send back the access token and refresh token. The client should store the access token (e.g., in memory or a secure store) and include it in the `Authorization` header for future requests. The refresh token could be stored securely as well – one common approach is to send it as an **HTTP-only cookie** so that it’s not accessible via JavaScript, mitigating XSS risks ([jwt - Why store Refresh Token in a HTTP Only Cookie Prevent From CSRF Attack? - Stack Overflow](https://stackoverflow.com/questions/67655189/why-store-refresh-token-in-a-http-only-cookie-prevent-from-csrf-attack#:~:text=In%20summary%2C%20they%20recommend%20to,Only%20Cookie)). In this example, we return it in the JSON response for simplicity, but you should strongly consider HTTP-only cookies for production (set on the server side via `res.cookie`).

**Important Security Note:** Never expose your JWT secret in code or client-side. Here we used `process.env.JWT_SECRET` – ensure you set this in your environment or a secure config. *"Remember to store your secure secret key securely (e.g., in environment variables or a secrets manager). Never hardcode your secret key in your code."* ([5 JWT authentication best practices for Node.js apps  | Tech Tonic](https://medium.com/deno-the-complete-reference/5-jwt-authentication-best-practices-for-node-js-apps-f1aaceda3f81#:~:text=Remember%20to%20store%20your%20secure,in%20a%20publicly%20accessible%20location)). Also, choose a strong, random secret at least 32 characters long ([5 JWT authentication best practices for Node.js apps  | Tech Tonic](https://medium.com/deno-the-complete-reference/5-jwt-authentication-best-practices-for-node-js-apps-f1aaceda3f81#:~:text=A%20secure%20secret%20key%20should,have%20the%20following%20characteristics)) to protect against brute force attacks if someone tries to guess it.

With login implemented, we have a way to authenticate users and issue tokens. Next, let's implement the refresh token model and the endpoint to refresh an access token when it expires.

## Refresh Token Model and Utility

Before writing the refresh endpoint, we'll set up a Mongoose model for refresh tokens. This will allow us to persist refresh tokens, check their validity, and implement rotation (invalidate old tokens once used).

```js
// models/RefreshToken.js
const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },            // the refresh token string
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },      // reference to User
  expiryDate: { type: Date, required: true }                       // expiration date-time for the token
});

// (Optional) You could add an index on expiryDate to automatically remove expired tokens with MongoDB TTL

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
```

Each refresh token document contains the token string, a reference to the user who owns it, and an expiry date. We mark the token as `unique: true` to ensure no duplicates. In a production system, you might also **hash** the refresh token before storing (similar to passwords) for extra security, but for our purposes we'll store it as is (since it's random) and trust our database security.

We can also create a couple of helper functions (e.g., in a `utils/tokenUtil.js`) to generate new tokens and check for expiration, but it's straightforward enough to do inline in our controller. Now, let's implement the refresh endpoint logic.

## Refresh Token Endpoint (Rotating Tokens)

The refresh endpoint allows clients to exchange a valid refresh token for a new access token (and a new refresh token). This enables the client to stay logged in without re-entering credentials, while still having short-lived access tokens for security. We will also implement **refresh token rotation**: each refresh token can only be used once – when a refresh happens, we'll invalidate (remove) the old refresh token and issue a new one ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=The%20refresh%20token%20rotation%20technique,generated%20tokens%20to%20the%20client)). This way, if a refresh token is stolen and tried to be reused, it would already be invalid.

**Route Definition:** Add the route in `routes/auth.js`:

```js
router.post('/refresh', authController.refreshToken);
```

**Controller Logic:** In `authController.js`, implement `exports.refreshToken`:

```js
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken: refreshTokenValue } = req.body;  // assuming the token is sent in request body
    if (!refreshTokenValue) {
      return res.status(400).json({ error: "Refresh token is required" });
    }
    // Find the refresh token in the database
    const tokenDoc = await RefreshToken.findOne({ token: refreshTokenValue });
    if (!tokenDoc) {
      // Token not found (invalid or already used)
      return res.status(403).json({ error: "Invalid refresh token" });
    }
    // Check if the refresh token is expired
    if (tokenDoc.expiryDate < new Date()) {
      // Token expired - delete it from DB and reject
      await RefreshToken.deleteOne({ _id: tokenDoc._id });
      return res.status(403).json({ error: "Refresh token has expired. Please log in again." });
    }

    // Token is valid and not expired at this point
    const userId = tokenDoc.user;
    // (Optionally, verify userId matches a real user and user still allowed; we fetch user for payload)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User associated with token not found" });
    }

    // **Refresh Token Rotation**: invalidate the current refresh token as it's being used
    await RefreshToken.deleteOne({ _id: tokenDoc._id });

    // Issue new tokens
    const newPayload = { id: user._id, email: user.email };
    const newAccessToken = jwt.sign(newPayload, process.env.JWT_SECRET, { expiresIn: '15m' });
    const newRefreshTokenValue = crypto.randomBytes(40).toString('hex');
    const newRefreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshToken.create({ token: newRefreshTokenValue, user: user._id, expiryDate: newRefreshExpiry });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenValue
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
```

**How the refresh logic works:**

- The controller expects the client to send the refresh token (here we read it from `req.body.refreshToken`). In a real scenario, if using HTTP-only cookies, you would retrieve it from `req.cookies` instead.
- It looks up the token in the `RefreshToken` collection. If not found, we immediately return 403 Forbidden – the token is invalid (perhaps it was revoked or never existed).
- If the token is found, we then check its `expiryDate`. If the refresh token has expired, we delete it from the database (cleanup) and return 403 Forbidden (client should be forced to log in again if they want to continue).
- If the token is valid (exists and not expired), we proceed to generate new tokens:
  - We retrieve the associated user (by `tokenDoc.user` which holds the user’s ID). This is used to build a new JWT payload. If for some reason the user no longer exists, we handle that as an error.
  - **Rotate Refresh Token:** We delete the used refresh token from the DB (`RefreshToken.deleteOne`). This is a security measure ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=The%20refresh%20token%20rotation%20technique,generated%20tokens%20to%20the%20client)) – now that it's being used to get a new token, it shouldn't be reused again. This prevents an attacker from reusing the refresh token if they somehow intercepted it during the refresh process.
  - We then create a **new access token** (short-lived as before, e.g., 15m) and a **new refresh token** (e.g., another random 40-byte string valid for 7 days) for the user. We save the new refresh token in the database.
- Finally, we return the new tokens to the client. The client should discard the old refresh token and replace it with this new one. From now on, the new access token is to be used for API calls, and the new refresh token for the next refresh cycle.

With this implementation, if a refresh token is leaked or attempted to be reused after a refresh, it will fail (since we removed it on use). This significantly reduces the window in which a stolen refresh token can be maliciously used, thereby improving security ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=The%20refresh%20token%20rotation%20technique,generated%20tokens%20to%20the%20client)).

**Note:** In a real-world application, you might also want to implement reuse detection – i.e., if an old refresh token is used again (which could indicate theft), you could revoke all sessions for that user or take other protective actions. That is beyond our scope here, but our design (storing tokens in DB) allows such checks.

Also, consider storing refresh tokens in an **HTTP-only cookie** rather than in the JSON response. Storing the refresh token in a cookie (with `HttpOnly` and `Secure` flags, and perhaps a `SameSite` attribute) can help mitigate XSS attacks since JavaScript cannot read the cookie ([jwt - Why store Refresh Token in a HTTP Only Cookie Prevent From CSRF Attack? - Stack Overflow](https://stackoverflow.com/questions/67655189/why-store-refresh-token-in-a-http-only-cookie-prevent-from-csrf-attack#:~:text=In%20summary%2C%20they%20recommend%20to,Only%20Cookie)). If you do so, your refresh endpoint can simply read `req.cookies.refreshToken` and you wouldn't send the token in the body at all. Just be mindful of CSRF – you may want to set `SameSite=strict` or use CSRF tokens, because an HTTP-only cookie will be sent automatically to your domain (an attacker could potentially trigger a refresh if not protected, even though they can't read the response) ([jwt - Why store Refresh Token in a HTTP Only Cookie Prevent From CSRF Attack? - Stack Overflow](https://stackoverflow.com/questions/67655189/why-store-refresh-token-in-a-http-only-cookie-prevent-from-csrf-attack#:~:text=https%3A%2F%2Fhasura.io%2Fblog%2Fbest)) ([jwt - Why store Refresh Token in a HTTP Only Cookie Prevent From CSRF Attack? - Stack Overflow](https://stackoverflow.com/questions/67655189/why-store-refresh-token-in-a-http-only-cookie-prevent-from-csrf-attack#:~:text=But%20is%20it%20store%20Refresh,Correct%20me%20if%20i%27m%20wrong)).

## Protecting Routes with Passport JWT Middleware

Now that we have authentication in place, we can protect our API routes using Passport's JWT strategy. Passport makes this easy by providing `passport.authenticate('jwt', { session: false })` as middleware to secure routes.

Let's say we have a protected route to get the user's profile (or any resource that requires a valid login). We can set it up as follows:

```js
// routes/user.js (or continue in routes/auth.js for this example)
const passport = require('passport');
const userController = require('../controllers/userController');

router.get('/profile', 
  passport.authenticate('jwt', { session: false }), 
  userController.profile
);
```

In the snippet above, the `passport.authenticate('jwt', { session: false })` middleware will automatically: extract the JWT from the Authorization header, verify it using the secret and our strategy, and, if valid, attach the decoded user to `req.user` ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=In%20the%20,_id%3A%20payload.id)). We pass `{ session: false }` to disable session support (we don't want to use server-side sessions with JWT) ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=In%20the%20,basic)). If the token is missing or invalid/expired, Passport will respond with a 401 Unauthorized for us – the `userController.profile` handler will not run in that case.

Here's a simple example of a protected controller:

```js
// controllers/userController.js
exports.profile = async (req, res) => {
  // This will only run if JWT auth succeeded (req.user is set)
  const user = req.user;
  // For demo, just return the user's data (could fetch more details from DB if needed)
  res.json({ 
    id: user._id, 
    email: user.email, 
    // ... any other user info, excluding sensitive data
  });
};
```

If the user has a valid access token, they will get a 200 OK and their profile data. If not, they'll get a 401 error from the authentication middleware. You can apply `passport.authenticate('jwt', ...)` to any route (GET, POST, etc.) that you want to secure. Typically, you'd protect all routes under a certain path (except auth routes) by applying this middleware.

At this point, our authentication system is complete: users can register, log in to get tokens, use the access token to call protected endpoints, and refresh the token when it expires, all while keeping credentials secure.

## Security Best Practices and Considerations

Finally, let's summarize some **secure practices** and important considerations for JWT authentication in an Express/Mongoose environment:

- **Short-lived Access Tokens:** Set a reasonable expiration for JWT access tokens. **Access tokens should have a short expiration time (e.g., 15 minutes to 1 hour)** ([5 JWT authentication best practices for Node.js apps  | Tech Tonic](https://medium.com/deno-the-complete-reference/5-jwt-authentication-best-practices-for-node-js-apps-f1aaceda3f81#:~:text=,in%20case%20of%20token%20theft)). This limits the window of opportunity if an access token is compromised. In our examples, we used 15 minutes.

- **Refresh Token Expiration:** **Refresh tokens typically have a longer lifespan (e.g., days or a week) ([5 JWT authentication best practices for Node.js apps  | Tech Tonic](https://medium.com/deno-the-complete-reference/5-jwt-authentication-best-practices-for-node-js-apps-f1aaceda3f81#:~:text=,authenticate))**, but not unlimited. We used 7 days in our example. Adjust this based on how often you want users to re-authenticate versus convenience.

- **Store Secrets Securely:** Manage your JWT secret (and any other secrets like DB passwords) via environment variables or a secrets manager, not in your source code ([5 JWT authentication best practices for Node.js apps  | Tech Tonic](https://medium.com/deno-the-complete-reference/5-jwt-authentication-best-practices-for-node-js-apps-f1aaceda3f81#:~:text=Remember%20to%20store%20your%20secure,in%20a%20publicly%20accessible%20location)). Use a strong, random secret key (at least 256 bits/32 chars) ([5 JWT authentication best practices for Node.js apps  | Tech Tonic](https://medium.com/deno-the-complete-reference/5-jwt-authentication-best-practices-for-node-js-apps-f1aaceda3f81#:~:text=A%20secure%20secret%20key%20should,have%20the%20following%20characteristics)). **Never commit secrets to your repository**.

- **Use Bcrypt for Passwords:** Always hash passwords with a strong algorithm like bcrypt before storing. Our implementation uses bcrypt with 10 salt rounds (common default). Bcrypt automatically salts the passwords and makes hashing computationally expensive, which thwarts brute-force attacks ([Password Hashing using bcrypt. What is bcrypt? | by Bhupendra | Medium](https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09#:~:text=,even%20as%20attackers%E2%80%99%20resources%20improve)). *Never store plaintext passwords* – this cannot be overstated ([Password Hashing using bcrypt. What is bcrypt? | by Bhupendra | Medium](https://medium.com/@bhupendra_Maurya/password-hashing-using-bcrypt-e36f5c655e09#:~:text=Best%20practices%20recommend%20never%20storing,hash%20and%20store%20them%20safely)).

- **HTTPS and Secure Cookies:** Serve your API over HTTPS so that tokens (especially if using cookies) are encrypted in transit. If you issue refresh tokens via cookies, mark them `HttpOnly` and `Secure`. Consider using the `SameSite` attribute to protect against CSRF (e.g., `SameSite=Lax` or `Strict` for the refresh token cookie).

- **Refresh Token Rotation:** As implemented, always invalidate the old refresh token when issuing a new one ([Implementing JWT Authentication with Express, MongoDB, and Passport.js - DEV Community](https://dev.to/michaelikoko/implementing-jwt-authentication-with-express-mongodb-and-passportjs-3fl7#:~:text=The%20refresh%20token%20rotation%20technique,generated%20tokens%20to%20the%20client)). This way, a refresh token cannot be used more than once. This limits the damage if a refresh token leaks or is intercepted. If an old refresh token is somehow used (token reuse attack), you should detect it (the DB lookup would fail) and you might log the event and force a complete logout of the user (revoking all tokens).

- **Logout and Token Revocation:** Implement a logout endpoint that deletes the user's active refresh token(s) from the database (and clears the cookie if applicable). Since JWTs are stateless, you typically can't "invalidate" an access token after issuing (it will just expire naturally). But removing the refresh token ensures the user cannot get a new access token once the current one expires. For immediate revocation of access tokens, you could maintain a token blacklist (in-memory or in DB) of revoked tokens to check against in `passport.authenticate`, but this adds complexity.

- **Additional Verification:** Depending on your needs, you might include additional data in the JWT payload (like a token version or user role) and verify it in the strategy. You could also enforce that the JWT token's `iat` (issued-at time) is after the user's last password change, to invalidate tokens issued before a password reset.

- **Testing and Validation:** Test the flow thoroughly. Try hitting a protected route with and without a token, with an expired token, and after using refresh. Ensure that errors are handled gracefully (e.g., our 401 and 403 responses). Using tools like Postman or curl can help simulate the sequence. In a real front-end, you would intercept 401 responses and prompt a token refresh or re-login accordingly.

By following these practices, you create a more secure authentication system. JWT-based auth (with access & refresh tokens) is stateless and scalable, but it must be implemented carefully to avoid common pitfalls. Always be mindful of the latest security advisories and consider using well-maintained libraries for any critical part of the auth process.

---

**Conclusion:** We built a complete JWT authentication flow with Passport.js, Express, and Mongoose. The solution featured a hashed-password user model, login and registration endpoints, JWT issuance, refresh token strategy with rotation, and route protection middleware. This modular approach (separating models, controllers, routes, etc.) makes the code maintainable and clear. With the fundamentals in place, you can extend this setup with additional features like role-based authorization, email verification, password resets, and integration with front-end applications. Happy coding!

