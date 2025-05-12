## **OSI Model & Network Layers**
In networking, data is broken into smaller units called **packets** before being sent over a network. Each layer in the **OSI model** adds information to these packets to ensure proper delivery.
### **1. Application Layer (HTTP, Developer's Layer)**
- Handles **HTTP, HTTPS, FTP, DNS, etc.**
- Used by web browsers, APIs, and applications.

### **2. Transport Layer (TCP & UDP)**
- Creates **ports (16-bit: 0 - 65535) for communication.**  
- **TCP (Transmission Control Protocol)**:  
  - **Reliable**, **ordered** delivery.  
  - Connection-based (handshake).  
  - Includes **error checking & congestion control**.  
- **UDP (User Datagram Protocol)**:  
  - **Faster** but **unreliable** (no handshake).  
  - Used for **streaming, gaming, VoIP**.

### **3. Network Layer (IP & Routing)**
- Uses **IP (Internet Protocol)** to assign addresses and route packets.
- When you connect to the internet, your **ISP** assigns a **public IP** to your router(changes over time).
- When you type URL, **DNS** translates it to an IP address.
  - **DNS (Domain Name System)** is a global network of servers that translate domain names (e.g., www.google.com) into IP addresses (e.g., 142.250.190.46).
  - Internet provider automatically assigns DNS servers when you connect. It functions like the internet's phonebook.

### **4. Link Layer (Ethernet, WiFi, MAC Addresses)**
- Manages **physical addressing (MAC address)**.
- Handles **LAN connections (WiFi, Ethernet, cables).**

### **5. Physical Layer (Hardware & Signals)**
- Includes **network cables, fiber optics, radio waves**.
## **HTTP and Networking Basics**
- **HTTP Characteristics:**  
  - Stateless  
  - Connectionless  
  - Flexible  

- **HTTP Message Structure:**  
  1. **Start Line:**  
     - Request: `GET /blog HTTP/1.1`  
     - Response: `HTTP/1.1 200 OK`  
  2. **Headers (Key-Value Pairs):**  
     - `Content-Type: text/html`  
     - `Content-Type: application/json` (note: typo in "application")  
     - `Cache-Control: public, max-age=0`  
     - `Date: Fri, 24 Aug 2018 15:23:58 GMT`  
  3. **Blank Line (Separates Headers & Body)**  
  4. **Body (Actual Content):**  
     - Can contain HTML, binary data (e.g., 4K video, images)  

Here’s a sample **HTTP request and response** where the server returns **JSON data** instead of HTML.

---

### **HTTP Request (Client to Server)**
```http
GET /api/user HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Connection: keep-alive
```
---
### **HTTP Response (Server to Client)**
```http
HTTP/1.1 200 OK
Date: Tue, 26 Feb 2025 12:00:00 GMT
Server: Apache/2.4.41 (Ubuntu)
Content-Type: application/json
Content-Length: 98
Cache-Control: public, max-age=3600

{
    "id": 123,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "admin"
}
```
### Request Headers vs Response Headers (Another example)
- **Request Headers**: Sent by the client to provide details about the request and the client environment (like `Authorization`, `User-Agent`).
```javascript
GET /api/resource HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: application/json
Authorization: Bearer <token>
Content-Type: application/json
```
- **Response Header**s: Sent by the server to inform the client about the response and provide handling instructions (like `Content-Type`).
```javascript
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 1234
Set-Cookie: sessionId=abcd1234; Path=/; HttpOnly
Cache-Control: no-store
Access-Control-Allow-Origin: https://example.com
```
### Status Codes
- Outcome of an HTTP request. For clients to understand if a request was successful or if there was an issue.
  - **2xx** Success Codes: Indicate the request was **successful**.
  - **3xx** Redirection Codes: Indicate **further actions need** to be taken by the client.
  - **4xx** Client Error Codes: Indicate an error from the **client**'s side.
  - **5xx** Server Error Codes: Indicate an error on the **server**’s side.
### Tokens
- Tokens are used for **authentication** and **authorization** in web applications, especially in **REST APIs**.
- Tokens help secure resources and verify the **identity** of users making requests to the server.
- How Tokens Work:
  - **Authentication**: When a user logs in, the server verifies their credentials.
  - **Token Generation**: If the credentials are valid, the server generates a token (JSON Web Token - JWT) and sends it back to the client.
  - **Token Usage**: The client stores the token (often in `localStorage`) and includes it in the headers of subsequent requests.
  - **Token Validation**: When the server receives a request, it checks the token for validity (Is it expired or is it tampered)
  - **Access Control:** If the token is valid, the server allows access to the requested resource.
### Top 5 REST Guidelines
1. **Separation of Client and Server**
   - Promotes **maintainability**
   - Enables **independent development**
   - Supports different clients (web, mobile)

2. **Stateless**
   - No server-side session
   - Each request is independent
   - **Lightweight**, easier to scale

3. **Uniform Interface**
   - Standardized communication (URLs, methods)
   - Clear resource identification (`/shoes`, `/shirts`)
   - **Consistency** across APIs

4. **Cacheable**
   - Responses can be **cached**
   - Improves **performance** and reduces load

5. **Layered System**
   - Enables **modularity** (e.g., using MVC)
   - Supports load balancers, gateways, security layers
This image explains the concept of **API versioning in RESTful APIs**, which is very relevant when building APIs with **Express.js**.

### API Versioning

**Versioning** means maintaining multiple versions of your API to:
* Support older clients (backward compatibility)
* Add new features without breaking existing apps

How to Do Versioning in Express.js (URL Path Versioning):
```js
// v1 routes
app.get('/api/v1/resource', (req, res) => {
  res.send('Response from API v1');
});

// v2 routes
app.get('/api/v2/resource', (req, res) => {
  res.send('Response from API v2');
});
```

### XSS Attack / SQL Injection Attack
- Definition: XSS occurs when an attacker injects malicious JavaScript into a web page's input fields.
- SQL Injection is when an attacker sends malicious SQL code in input fields. This could be run if the backend doesn’t sanitize inputs.
```html
<script>
  console.log("XSS attack!");
  var img = new Image();
  img.src = "http://attacker.com";
</script>
```
- to Prevent XSS use `sanitize-html`, a Node.js module:
```javascript
const sanitizeHtml = require('sanitize-html');
const userInput = '<script>alert("XSS attack!");</script>Happy';
const sanitizedInput = sanitizeHtml(userInput);
console.log(sanitizedInput); // Output: Happy
```
### Node.js Performance
1. **Database Optimization**:
   Use indexes and efficient queries to speed up DB operations.
2. **Asynchronous Code**:
   Use async/await or promises to prevent blocking the event loop.
3. **Caching**:
   Store frequent data in memory (e.g., Redis) to reduce DB load.
4. **Load Balancing**:
   Distribute traffic across app instances using tools like Nginx or PM2.
5. **Compression**:
   Compress responses (e.g., gzip) to reduce payload size and speed up transfer.
6. **Streaming I/O**:
   Process large files in chunks instead of loading all at once (less memory).
7. **Monitoring & Profiling**:
   Use tools to detect slow parts and continuously improve performance.
### Nodemon 
- A tool that helps with Node.js development by automatically restarting the server whenever it detects file changes in the project.
- To install: `npm install -D nodemon` (`--save-dev` is older version of `-D`)
### Environmental Variables 
- The `dotenv` package is used to manage environment variables in Node.js applications. To install: `npm install dotenv`
```
//config.env
NODE_ENV = development
PORT = 3000
MONGO_URI=mongodb+srv://reza123:reza123@dev-camper.d4ruz.mongodb.net/dev-camp?retryWrites=true&w=majority&appName=dev-camper
```
- To get access to the variable:
```
```javascript
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});

const connectedDB = () => mongoose.connect(process.env.MONGO_URI);
```
### `NEW:` Native Environmental Variables & Watch mode
- The following modification in `package.json` replaces the `dotenv` and `nodemon` packages.
```
  "scripts": {
    "start:dev": "node --watch --env-file=.env ./src/server.js"
  },
```
### HTTP vs Express
- comparison between using Express.js and the built-in http module

| Feature                     | **Express.js**                             | **Node.js http module**                |
|----------------------------|---------------------------------------------|----------------------------------------|
| **Import**                 | `const express = require('express')`       | `const http = require('http')`         |
| **Create server**          | `const app = express();`                   | `const server = http.createServer()`   |
| **Listen on port**         | `app.listen(port)`                         | `server.listen(port)`                  |
| **Routing support**        | ✅ Built-in (`app.get('/', ...)`)           | ❌ Manual check inside callback         |
| **Middleware support**     | ✅ Easy with `app.use(...)`                 | ❌ Needs custom implementation          |
| **Code simplicity**        | ✅ Cleaner and shorter                     | ❌ More boilerplate                     |
| **Flexibility & Plugins**  | ✅ Huge ecosystem (body-parser, etc.)       | ❌ Very basic                           |
| **Example Response**       | `res.send("Hello")`                        | `res.writeHead(200); res.end("Hello")` |

### express.static
- `express.static` is built-in middleware in Express used to serve static files like **HTML, CSS, JS, Images (PNG, JPG, etc.), PDFs, etc.**
```js
app.use(express.static('public'));
```
This serves files from the `public` folder.
#### Example:
If you have:
```
/public/logo.png
```

You can access it in browser at:
```
http://localhost:3000/logo.png
```
### Template Engines
Template engines are libraries that allow developers to generate dynamic HTML content by combining:
- Static HTML templates
- Dynamic data (from a database or variables)
- Example in EJS:
```html
<p>Hello, <%= data %></p>
```
```js
// app.js
import express from 'express';
import ejs from 'ejs';

const app = express();

app.set('view engine', 'ejs'); // Tell Express to use EJS

app.get('/', (req, res) => {
  const user = 'Reza'; // 👉 This is the "data"
  res.render('home', { data: user }); // Sends "data" to EJS template
});
```
### First Simple Server
- You should install `express`, `nodemon`, and `dotenv` to create and run a simple express server.
- To use **ES modules** syntaxt (using `import` instead of `require`, add `"type": "module"` to the **package.json**:
```javascript
// package.json
{
  "name": "express_anson",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:dev": "nodemon src/index.js",
    "start": "node src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "dotenv": "^16.4.7",
    "express": "^4.21.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  },
  "type": "module"
}
```
```javascript
// index.js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.status(201).send({"name":"Reza"});
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
```
### Route Parameters
- **Route params** (like `:id`) are placeholders in the URL path that capture values from the request URL.
- In `app.get('/api/users/:id')`, `:id` captures whatever comes after `/api/users/` and makes it available as `req.params.id`.
```javascript
// index.js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id: 1, username: "anson", displayName: "Anson"},
    {id: 2, username: "jack", displayName: "Jack"},
    {id: 3, username: "adam", displayName: "Adam"},
    {id: 4, username: "tina", displayName: "Tina"},
    {id: 5, username: "jason", displayName: "Jason"},
    {id: 6, username: "henry", displayName: "Henry"},
    {id: 7, username: "marilyn", displayName: "Marilyn"},
];

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});

app.get('/api/users', (req, res) => {
    res.status(201).send(mockUsers);
});

app.get('/api/users/:id', (req, res) => {
    // better than (if(isNaN(id)):
    // if (!/^\d+$/.test(req.params.id)) {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send('Invalid ID');
    }
    const id = parseInt((req.params.id));
    const userIndex = mockUsers.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).send('username not found');
    }

    res.status(200).send(mockUsers[userIndex]);
});
```
### Query Parameters
- In Express, `req.query` is used to access the **query parameters** that are sent in the URL.
- For example: `http://localhost:3000/api/users?filter=displayName&value=T`
```javascript
// req.query
{
  filter: 'displayName',
  value: 'T'
}
```
```javascript
// index.js
// Same as above
app.get('/api/users', (req, res) => {
    const {filter, value} = req.query;
    console.log(filter, value);
    if (filter && value) {
        const selectedUsers = mockUsers.filter(user => user[filter].includes(value));
        return res.status(200).json(selectedUsers);
    }
    res.status(200).send(mockUsers);
});
```
### CRUD Operations 
- These four operations are fundamental in managing data in applications and databases.
- **Note that:** To prevent further execution of the function when we send the response, we should `return` it. 
```javascript
app.delete('/api/users/:id', (req, res) => {
    // better than (if(isNaN(id)):
    if (!/^\d+$/.test(req.params.id)) {
        return res.status(400).send('Invalid ID');
    }
    const id = parseInt((req.params.id));
    const userIndex = mockUsers.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).send('username not found');
    }
    mockUsers.splice(userIndex, 1);
    res.sendStatus(200);
});

app.post('/api/users', (req, res) => {
    const {body} = req;

    if (!body.username || !body.displayName) {
        return res.status(400).json({error: 'username and displayName are required'});
    }
    const {username, displayName} = body;
    const newId = mockUsers.length > 0 ? parseInt(mockUsers[mockUsers.length - 1].id) + 1 : 1;
    const newUser = {id: newId, username, displayName};
    mockUsers.push(newUser);
    res.status(201).json(newUser);
});

app.patch('/api/users/:id', (req, res) => {
    // better than (if(isNaN(id)):
    if (!/^\d+$/.test(req.params.id)) {
        return res.status(400).send('Invalid ID');
    }
    const id = parseInt((req.params.id));
    const userIndex = mockUsers.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).send('username not found');
    }

    const {body} = req;
    if (!body.username && !body.displayName) {
        return res.status(400).json({error: 'username and displayName are required'});
    }

    mockUsers[userIndex] = {...mockUsers[userIndex], ...body};
    res.status(200).json(mockUsers[userIndex]);
});

app.put('/api/users/:id', (req, res) => {
    // better than (if(isNaN(id)):
    if (!/^\d+$/.test(req.params.id)) {
        return res.status(400).send('Invalid ID');
    }
    const id = parseInt((req.params.id));
    const userIndex = mockUsers.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).send('username not found');
    }

    const {body} = req;
    if (!body.username || !body.displayName) {
        return res.status(400).json({error: 'username and displayName are required'});
    }

    mockUsers[userIndex] = {id, ...body};
    res.status(200).json(mockUsers[userIndex]);
});
```
### Middleware
- Middleware in Express.js is a function that executes before reaching the actual route handler. It can be **global** (applies to all routes) or **local** (applies to specific routes).
- **Global** Logging Middleware. It runs for all following requests:
```javascript
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Moves to the next middleware or route handler
});
```
- **Local** Middleware (i.e. `resolveIndex`). Runs only for specific routes:
```javascript
const resolveIndex = (req, res, next) => {
    // better than (if(isNaN(id)):
    if (!/^\d+$/.test(req.params.id)) {
        return res.status(400).send('Invalid ID');
    }
    const id = parseInt((req.params.id));
    const userIndex = mockUsers.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).send('username not found');
    }
    req.userIndex = userIndex;
    next();
};

app.get('/api/users/:id', resolveIndex, (req, res) => {
    res.status(200).send(mockUsers[req.userIndex]);
});

app.delete('/api/users/:id', resolveIndex, (req, res) => {
    mockUsers.splice(req.userIndex, 1);
    res.sendStatus(200);
});

```
- The following applies the middleware to **any route starting with `/example`** (e.g., `/example`, `/example/test`).
```js
app.use('/example', middleware);
```
#### Advantages of Middleware

1. **Modularity**  
   - Break logic into **small, single-purpose functions**.  
   - Easier to read, test, and manage.

2. **Reusability**  
   - Middleware can be used in **multiple routes** or apps.  
   - Helps with **maintainability** and consistency.

3. **Improved Request Handling**  
   - Middleware has access to both `req` and `res`.  
   - You can do **validations**, add headers, or modify requests before hitting route handlers.

4. **Flexible Control Flow**  
   - Middleware can be applied to:
     - All routes: `app.use()`
     - Specific routes: `app.use('/api', middleware)`  
   - Gives control over how and when requests are processed.

5. **Third-party Middleware**  
   - You can easily plug in packages like:
     - `body-parser` (for parsing request body)
     - `cors` (for cross-origin support)
     - `helmet`, `morgan`, `cookie-parser`, etc.

### CORS (Cross-Origin Resource Sharing)

* **CORS** is a **security feature** in browsers that blocks requests from one origin (domain, protocol, or port) to a different origin unless explicitly allowed by the server.
* The **origin** includes:

  * Protocol (HTTP or HTTPS)
  * Domain (e.g., interviewwhappy.com vs xyz.com)
  * Port (default 80, 443, or custom like :12)

#### From the image:

✅ Allowed:

* `http://interviewwhappy.com/getdata` → Same origin (domain, protocol, port) as `http://interviewwhappy.com/index.html`

❌ Blocked:

* Different domain: `http://xyz.com/getdata`
* Different subdomain: `http://api.interviewwhappy.com/getdata`
* Different protocol: `https://interviewwhappy.com/getdata`
* Different port: `http://interviewwhappy.com:12/getdata`

To **allow CORS**, the server must send specific headers like:

```http
Access-Control-Allow-Origin: *
```

or restrictively:

```http
Access-Control-Allow-Origin: http://example.com
```
#### cors middleware:
- `CORS` is a `node.js` package for providing a Express middleware that can be used to enable `CORS` with various options.
```javascript
const express = require('express');
const cors = require('cors'); // Import cors

const app = express();

app.use(cors()); // Enable CORS for all routes

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.listen(3000, () => {
  console.log('Server is running');
});

```
### Routes
- `express.Router()` creates a mini Express app — a modular, mountable route handler.
- You attach HTTP method handlers (like `.get`, `.post`) to it.
- It allows you to group related routes (e.g., `/tasks`) in one file, then plug them into the main app.
- We can chain different HTTP methods for the **same route path**.
```javascript
//routes/tasks.js
import express from 'express';
import {createTasks, deleteTasks, getTasks, updateTasks} from "../controller/tasks.js";

const router = express.Router();

router.use(express.json());

router.route('/')
    .get(getTasks)
    .post(createTasks);

router.route('/:id')
    .put(updateTasks)
    .delete(deleteTasks);

export default router;
```
```javascript
//index.js
import express from 'express';
import router from "./routes/tasks.js";

app.use('/v1/api', router);
```
### Serialization and Deserialization
* Express **automatically handles** both serialization (response) and deserialization (request) using `res.json()` and `express.json()`.
* You just need to use the correct middleware for parsing request bodies.
When you send data (like an object) in a response:
```js
res.json({ name: "Reza", age: 30 });
```
Express **serializes** the JavaScript object to JSON before sending it over the network.
#### *Deserialization**
When you receive JSON from a client (like in a `POST` request), Express uses middleware (e.g., `express.json()`) to **deserialize** the JSON back into a JavaScript object:
```js
app.use(express.json()); // Middleware to deserialize incoming JSON
app.post('/user', (req, res) => {
  console.log(req.body); // Already deserialized into JS object
});
```
### Validation
- We use 3rd party library for express validation: `npm install express-validator`
#### Validate Query Params
- We use `query` and `validationResult` for this goal. Note that we are validating 2 query params here:
```javascript
import {query, validationResult} from 'express-validator';

app.get('/api/users',
    [
        query("filter")
            .notEmpty()
            .withMessage("filter is required"),
        query("value")
            .notEmpty()
            .withMessage("value is required")
    ],
    (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(404).send('filter and value is required');
        }
        const {filter, value} = req.query;
        if (filter && value) {
            const selectedUsers = mockUsers.filter(user => user[filter].includes(value));
            return res.status(200).json(selectedUsers);
        }
        res.status(200).send(mockUsers);
    });
```
## Cookies 
- Cookies are small pieces of data stored on the client’s browser and sent with every request to the server. They are used for session management, authentication, preferences, and tracking.
```javascript
app.get('/set-cookies', (req, res) => {
    res.setHeader('Set-Cookie', ['newUser=false, 'isEmployee=true']);
    res.send('Cookies set without cookie-parser!');
});
```
- Here the Express app demonstrates how to set and read cookies using the `cookie-parser` library/middleware.
```javascript
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
```
- Setting Cookies:
```javascript
app.get('/set-cookies', (req, res) => {
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send('you got the cookies!');
});
```
- Reading Cookies:
```javascript
app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.json(cookies);
});
```

- Summary Table

| **Property**  | **Description** | **Default** |
|--------------|----------------|-------------|
| `maxAge` | Expiration time in milliseconds | **Session-based** (until browser closes) |
| `httpOnly` | Prevents JavaScript access | `false` |
| `secure` | Sends only over HTTPS | `false` |
| Without `cookie-parser` | Must manually parse `req.headers.cookie` | N/A |

- **Best Practices**: Always use **`httpOnly`** for security and **`secure: true`** in production with HTTPS.

## Session-Based Authentication in Express with Cookies
- **Cookies** are small pieces of data stored on the client (browser) and sent with every request.
  - The server sets a cookie in the response.
  - The browser stores the cookie and sends it back with every request.
  - The server reads the cookie to access stored data.
    
- **Cookies** Are Sent with Every Request, BUT…
  - By default, cookies are sent automatically with every request to the **same domain** (same-origin requests).
  - However, for cross-origin requests (e.g., frontend on localhost:4200, backend on localhost:3000), cookies are not sent automatically due to browser security restrictions.
  - In cross-origin cases, you must explicitly **enable credentials** in the request.
    
- **Sessions** store data server-side, with only a session ID stored in a cookie (`connect.sid`).
  - The server creates a session and stores data on the server.
  - A session ID is sent to the client in a cookie (`connect.sid`).
  - The client sends this session ID with every request.
  - The server retrieves the session data using the ID.
- The **session middleware** from `express-session` is used to manage user sessions in an Express app.
```javascript
import express from 'express';
import session from 'express-session';

const app = express();
app.use(express.json());

// Simulated user database
const users = {
    'JohnDoe': 'password123',  // Username: Password
    'JaneDoe': 'securePass'
};

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly: true, maxAge: 600000},
}));

app.get("/", (req, res) => {
    res.send("index");
});

app.post("/login", (req, res) => {
    console.log(req.body);
    const {username, password} = req.body;
    if (users[username] && users[username] === password) {
        req.session.user = username;
        res.send(`Welcome ${username}`);
    }else{
        res.status(401).send("Not authorized");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
```
- the user logs in using a correct creds:
```javascript
{
    "username": "JohnDoe",
    "password": "password123"
}
```
- `session` middleware creates a new **session** and assignes a **session id.**
- A **session** is essentially a **container** for storing data specific to a user between HTTP requests. Since HTTP is stateless, sessions help maintain user state without requiring the client to send data every time.
- Since a session is just a container for user data, you can store:
  - Authentication Data
  - Shopping Cart Data
  - Temporary Form Data
- Session looks like:
```javascript
{
  "f12345678xyzabcdef": {
    "cookie": {
      "originalMaxAge": 600000,
      "expires": "2025-03-14T12:30:00.000Z",
      "httpOnly": true
    },
    "user": {
      "username": "JohnDoe"
    }
  }
}
```
- The key (f12345678xyzabcdef) is the session ID.
- The value is an object that contains:
  - cookie → Cookie settings.
  - user → Custom data (set in `req.session.user`).
- The session ID is signed using HMAC with a secret key (mySecret).
- The signed session ID is stored in the `connect.sid` cookie.
- In the POST call you check the creds and if correct, sends the 200 OK response
- When a new session is created (e.g., after logging in), the server sends `connect.sid` in the Set-Cookie **header**.
#### Breaking Down the `connect.sid`
1. **Prefix (`s%3A`)**  
   - `s%3A` is **URL-encoded** for `s:`.  
   - It **indicates that the session ID is signed** for security purposes.  

2. **Session ID (`f12345678xyzabcdef`)**  
   - This is the **randomly generated session identifier**.  
   - `express-session` assigns this **unique** session ID to each user.  
   - It is used as a **lookup key** in the session store (memory, Redis, etc.).  

3. **Signature (`KJHgf67sdhASD87sdjh`)**  
   - This is an **HMAC signature**, created using:  
     ```
     HMAC(secret, sessionID) → Signature
     ```
   - Ensures that the session ID **has not been tampered with**.  
   - If a hacker modifies the session ID, the signature **won't match**, and the session is rejected.  
#### After log in
- After logging in, the browser automatically sends the `connect.sid` cookie with each request.
- The express-session middleware extracts the session ID, verifies it in the session store, and populates `req.session` with stored data (i.e. username).
  - Extracts the Session ID
    - express-session retrieves the `connect.sid` cookie and extracts the first part (session ID) from it.
  - Recomputes the HMAC Signature
    - Using the session ID + secret, it generates a new HMAC signature.
    - If the recomputed signature matches the one from `connect.sid`, it confirms the session ID hasn’t been tampered with.
  - Looks Up the Session ID in the Store
    - The middleware checks if the session ID exists in memory (or Redis, database, etc.).
    - If the session is found, it loads the stored session data into `req.session`.
```javascript
app.get('/get-session', (req, res) => {
    res.send(req.session.user || 'No session found');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
- **Protected** routes check `req.session.user` to authenticate users. If the session is expired or destroyed, the user must log in again.
- When we are saying **Protected**, it meand using an if condition to check is `req.session.user` exists. like the following middleware:
```javascript
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send("Unauthorized - Please log in");
    }
    next(); // Proceed to the next middleware or route handler
```
- When multiple users log in, each **user has their own unique session ID (`connect.sid`)**, and when a user makes a request, `req.session` contains **only that user’s session data**.
1. **Each User Gets a Unique Session**
   - When **User A** logs in, a **session is created** and assigned a unique session ID (`connect.sid`).
   - When **User B** logs in, they receive a **different session ID**.
   - The session data for each user is stored separately in memory, Redis, or a database.

2. **Requests Include the User's Session ID**
   - The browser automatically sends the **correct `connect.sid`** for each user.
   - The **server retrieves the matching session** and loads it into `req.session`.

3. **Each `req.session` Holds the Authenticated User's Data**
   - When a request is made, **only the session for that user is available** in `req.session`.
   - Example:
     ```javascript
     app.get("/dashboard", (req, res) => {
         console.log(req.session); // Logs the current user's session data
         res.send(`Hello, ${req.session.user.username}`);
     });
     ```
   - If **User A** is logged in, `req.session.user.username` might be `"JohnDoe"`.
   - If **User B** makes a request, `req.session.user.username` will be `"JaneDoe"`.
#### Logout
- Best Practice for logout is Using `POST`
- Using `POST` ensures intentional logout actions.
- `POST /logout` prevents automatic execution via links (`<a href="/logout">`).
```javascript
// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.send('Logged out successfully');
        // res.status(200).end(); Another Option with no response value, just status
    });
});
```
#### saveUninitialized: false
- a new session ID will be created for every request if the session middleware is used but no existing session is found.
- `saveUninitialized: false` ensures that an empty session is not stored unless something is added to it.
- Using `POST` ensures intentional logout actions.
- `POST /logout` prevents automatic execution via links (`<a href="/logout">`).
#### resave: false
- If the session is unchanged, it will not be re-saved to the store.
- If the session is modified (e.g., `req.session.user = {...})`, it will be saved.
### Controllers
- Controllers handle the business logic for specific **routes**. They receive **requests**, process them (possibly interacting with a database), and send back **responses**
```javascript
// userController.js
exports.getUser = (req, res) => {
  const userId = req.params.id;
  // Imagine fetching user from DB here
  res.json({ id: userId, name: "John Doe" });
};
```
```javascript
const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
```
## express-validator

`express-validator` validates and sanitizes the user input in an Express API with `checkSchema`, `validationResult`, and `matchedData`.

### Flow Diagram

```
Client Request (POST /users)
        ↓
  userSchema (Validation Rules via checkSchema)
        ↓
  validateRequest (ValidationResult Handling Middleware)
        ↓
  createUsers Controller (Business Logic + matchedData)
        ↓
   Response (201 Created or 400 Bad Request)
        ↓
Unhandled Errors → errorHandler Middleware
```

### user.router.js

```js
import express from 'express';
import { userSchema } from '../schemas/user.schema.js';
import { createUsers } from '../controllers/user.controller.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = express.Router();

router.post('/', userSchema, validateRequest, createUsers);

export default router;
```
### user.controller.js
```js
import { matchedData } from 'express-validator';

export const createUsers = (req, res, next) => {
    try {
        const data = matchedData(req); // Only validated and sanitized fields
        return res.status(201).send(data);
    } catch (error) {
        next(error); // Pass unexpected errors to the error handler
    }
};
```
### user.schema.js

```js
import { checkSchema } from 'express-validator';

export const userSchema = checkSchema({
    username: {
        in: ['body'],
        trim: true,
        escape: true,
        isString: { errorMessage: 'Username should be a string' },
        notEmpty: { errorMessage: 'Username is required' },
        isLength: {
            options: { min: 3, max: 20 },
            errorMessage: 'Username must be between 3 and 20 characters'
        },
        matches: {
            options: [/^[a-zA-Z0-9]+$/],
            errorMessage: 'Invalid username (letters and numbers only)'
        }
    },
    email: {
        in: ['body'],
        notEmpty: { errorMessage: 'Email is required' },
        isEmail: { errorMessage: 'Invalid email address' },
        normalizeEmail: true
    },
    password: {
        in: ['body'],
        notEmpty: { errorMessage: 'Password is required' },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters'
        },
        matches: {
            options: [/^(?=.*[A-Za-z])(?=.*\d).+$/],
            errorMessage: 'Password must contain at least one letter and one number'
        }
    },
    age: {
        in: ['body'],
        optional: true,
        isInt: {
            options: { min: 13, max: 120 },
            errorMessage: 'Age must be an integer between 13 and 120'
        },
        toInt: true
    },
    phone: {
        in: ['body'],
        optional: true,
        isMobilePhone: {
            options: ['en-US'],
            errorMessage: 'Invalid phone number'
        }
    },
    isAdmin: {
        in: ['body'],
        optional: true,
        isBoolean: {
            errorMessage: 'isAdmin must be a boolean value'
        },
        toBoolean: true
    }
});
```
### middleware/validateRequest.js

```js
import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(err => ({
                field: err.param,
                message: err.msg
            }))
        });
    }
    next();
};
```

### middleware/errorHandler.js
- `errorHandler` catches and formats unexpected runtime errors.
```js
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
};
```

In your main server file (e.g. `app.js` or `index.js`), make sure to use the middleware:

```js
import express from 'express';
import userRouter from './routes/user.router.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use('/users', userRouter);

// Error handler should be last
app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));
```
### matchedData(req)
- `matchedData(req)` is a utility function from express-validator that extracts only the validated and sanitized fields from the request.
- Notice how "role" is not included because it wasn't in the schema.
```js
// Given a schema:
checkSchema({
  username: { in: ['body'], isString: true, trim: true },
  age: { in: ['body'], isInt: true, toInt: true }
});

// And a request body:
{
  "username": "  John  ",
  "age": "30",
  "role": "admin"  // not validated
}

const data = matchedData(req);
console.log(data); // { username: "John", age: 30 }
```
### validationResult(req)

This function returns a `Result` object that contains info about validation errors (if any). From it, you can use:

#### 1. isEmpty()
- Checks if there are any validation errors.
- Returns: `true` if no errors, `false` if there are errors.
```js
const errors = validationResult(req);
if (!errors.isEmpty()) {
  // There are validation errors
}
```
#### 2. array()
-Returns all validation errors as an array.
```js
const errorArray = errors.array();
```
Each item looks like:
```js
{
  value: 'abc',
  msg: 'Invalid input',
  param: 'username',
  location: 'body'
}
```
#### 3. mapped()
- Returns validation errors as an object keyed by field name.
- Best when you want to show errors by field (e.g., form inputs).
```js
const errorMap = errors.mapped();
```
Example output:
```js
{
  username: {
    value: 'abc',
    msg: 'Invalid input',
    param: 'username',
    location: 'body'
  }
}
```
## Normal VS Error-handling middleware
This image explains **how error handling works in Express when you have multiple middleware functions**.
### Normal middleware:
- If `middleware2` throws an error or calls `next(err)`, Express **skips** `middleware3` and `middleware4` and jumps to the **error-handling middleware**.

   ```js
   app.use(middleware1);
   app.use(middleware2); // Error occurs here
   app.use(middleware3);
   app.use(middleware4);
   ```
### Error-handling middleware
- Always use 4 parameters for the error middleware.
- Define your **error middleware at the end**.
- Errors skip the normal middleware and go straight to the error handler.

  ```js
   app.use((err, req, res, next) => {
       console.error(err.stack);
       res.status(500).send("Something went wrong!");
   });
   ```
## Hashing passwords
- **bcryptjs** is a password hashing algorithm designed to securely store passwords by making brute-force attacks slow and computationally expensive.
```bash
npm install bcryptjs
```
```js
import bcrypt from 'bcryptjs';

const saltRounds = 10;

// Hash password before saving to DB
export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

// Compare plain password with hashed password
export const comparePassword = (plain, hashed) => {
    return bcrypt.compareSync(plain, hashed);
};
```
### sign-up (registration):
  - User enters a password: The user provides a password (e.g., "test1234") during registration.
  - Salt is generated: A unique random salt (e.g., "hAjfg") is created for that user.
  - Hashing process: The password is combined with the salt and passed through a hashing algorithm (e.g., bcrypt, Argon2).
  - Hashed password is stored: The resulting hash (e.g., "$5.6A6g34c9....") is stored in the database along with the salt.
  - **bcrypt** returns a single string that contains:
    - The algorithm version (`$2b$`)
    - The cost factor (`$12$`)
    - The salt
    - The hashed password
- Sample: `$2b$12$G8Y9Xg5s9MfB8Q9.rQ.r9OSQ3j2FdR3DOe6GTUoHgLQxPK/P2mD3q`
```js
import express from 'express';
import { User } from '../models/user.model.js';
import { hashPassword } from '../utils/helpers.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const newUser = new User(req.body);
    newUser.password = hashPassword(newUser.password); // 🔐 hash here
    await newUser.save();
    res.json(newUser);
});
```
### login:
  - The user provides their email/username and password on the login form.
  - The system looks up the user's stored hashed password and the salt in the database.Then **bcrypt** extracts the salt and cost from the stored hash
  - The system combines the salt with the entered password and applies the same hashing algorithm (e.g., bcrypt, Argon2, PBKDF2).
  - The newly generated hash is compared with the stored hash in the database.
- If a hacker compromises a database and gains access to both salted hashes and salts, it still significantly improves security compared to unsalted hashing. Here’s why:
  - **Unique Hashes for Same Passwords:** If multiple users have the same password, their hashed passwords will be different.
  - **Prevents Rainbow Table Attacks:** Hackers cannot use precomputed hash tables (rainbow tables) to instantly crack passwords.
  - **Slows Down Brute Force Attacks:** Even if a hacker tries to brute-force each hash, they must compute the hash for each user.
```js
import { comparePassword } from '../utils/helpers.js';

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !comparePassword(req.body.password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ msg: 'Login successful', user });
});
```
## Passport
### Before login: Request flow with `passport.session()`

#### 1. User is **not logged in**
- No session has been created yet.
- Browser has **no session cookie** (`connect.sid`).

#### 2. On each request:
```js
app.use(passport.session());
```

This middleware:
- **Checks for a session ID** in the cookie.
- **No cookie is found**, so:
  - It skips `deserializeUser()`
  - `req.user` stays **undefined**

```js
// deserializeUser is NOT called
// req.user === undefined
```

❌ `req.isAuthenticated()` returns **false**

---

#### 3. User attempts to log in:

```js
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));
```

- Triggers the `LocalStrategy`:

```js
passport.use(new LocalStrategy((username, password, done) => {
  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return done(null, false, { message: 'Invalid credentials' });
  }
  return done(null, user); // ✅ Successful login
}));
```
#### 4. `serializeUser()` is called:
```js
passport.serializeUser((user, done) => {
  done(null, user.id); // Store only user ID in session
});
```

✅ The session is now stored (in memory, Redis, DB, etc.)  
✅ The client receives a session cookie (`connect.sid`)

### After login: Request flow with `passport.session()`

#### 1. User is **logged in**
- `serializeUser` has saved the user ID in the session.
- A session ID is stored in a cookie (`connect.sid` by default).

#### 2. On any future request:
```js
app.use(passport.session());
```

This middleware:
- **Checks for a session ID** in the cookie (e.g., from the browser).
- If session exists, it reads the stored user ID.
- Then it calls:

```js
passport.deserializeUser((id, done) => {
  const user = findUserById(id); // could be DB or in-memory
  done(null, user); // attaches user to req.user
});
```

✅ If deserialization succeeds → `req.user` is populated  
❌ If no session or user → `req.user` stays `undefined` OR `req.isAuthenticated()` returns `false`  
❌ `req.isAuthenticated()` is a Passport method that tells you if the current request has a valid authenticated session.


#### 3. `req.user` is populated on **every request**:

- **Between two calls**, things *could* change:
  - User logs out from another tab or device.
  - Session expires.
  - Server is restarted (and session store cleared).
  - Session is manually revoked (e.g., admin force-logout).

> So Passport **re-validates the session** on every request via `deserializeUser()` to make sure the session is still valid and user still exists.
Excellent question — here's a clean breakdown to fully answer this:

### ✅ We should **always check** authentication in `protected routes`:
- That’s our job to handle the error in the route handler or via middleware.
```js
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // ✅ Logged in — continue to route
  }

  // ❌ Not logged in — choose one based on your app type:

  // For SPA or client-side routing:
  return res.status(401).json({ message: 'Unauthorized' });

  // For SSR (e.g., EJS, Pug, etc.):
  return res.redirect('/login');
}
```
Usage:
```js
app.get('/profile', ensureAuthenticated, (req, res) => {
  // ✅ Logged in — send user data
  res.json({ user: req.user });
});
```
### ✅ Logout
`req.logout()` is a method added by Passport to the req object when you're using Passport with sessions.
- It removes the authenticated user from the session.
- Clears `req.user`.
- req.logout(callback) is asynchronous and **requires** a callback.
- After calling it, `req.isAuthenticated()` will return false.
```js
router.post('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) next(err);
        res.sendStatus(200);
    });
});
```
### Express + Passport Session Auth: Full Flow
```js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------- SESSION SETUP -----------------
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

// ----------------- PASSPORT SETUP -----------------
app.use(passport.initialize());
app.use(passport.session());

const users = [{ id: 1, username: 'admin', password: '1234' }];

// Strategy (runs only on login)
passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user || user.password !== password) {
    return done(null, false, { message: 'Invalid credentials' });
  }
  return done(null, user);
}));

// Serialize (runs on successful login)
passport.serializeUser((user, done) => {
  done(null, user.id); // stores user ID in session
});

// Deserialize (runs on every request *after* login)
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user || false);
});

// ----------------- LOGIN ROUTE -----------------
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in', user: req.user });
});

// ----------------- PROTECTED ROUTE -----------------
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();

  // For SPA:
  return res.status(401).json({ message: 'Unauthorized' });

  // For SSR:
  // return res.redirect('/login');
}

app.get('/profile', ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// ----------------- LOGOUT ROUTE -----------------
app.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
});

// ----------------- SERVER -----------------
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

```
## Express + MongoDB + Mongoose API

### What is MongoDB?
MongoDB is a **NoSQL database** that stores data in flexible, JSON-like documents (called BSON internally). It uses collections instead of tables and documents instead of rows.

- Documents = JavaScript objects
- Collections = Arrays of documents
- Schema-less (**but schema can be enforced with Mongoose)**

### What is Mongoose?
Mongoose automatically maps the model name to a MongoDB collection name by converting it to lowercase and pluralizing it.

For example:
```js
mongoose.model('User', UserSchema)
```
This maps to the `users` collection in MongoDB.
Mongoose is an ODM (Object Data Modeling) library that:
- Creates schemas to define document structure
- Adds validation, default values, and type casting
- Maps models to MongoDB collections
- Makes it easy to interact with MongoDB using familiar JavaScript syntax

Mongoose handles:
- Defining schemas
- Connecting to MongoDB
- CRUD operations (`find()`, `save()`, `deleteOne()`, etc.)
- Validation and error handling

### Mongoose Schema and Model

```js
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true }
}, {
    collection: 'user_info' // 👈 Optional: name your MongoDB collection 
});                         // Otherwise it will use the plural, lowercase model name (User ->users) 

export const User = mongoose.model('User', userSchema);
```

### Mongoose Schema and Password Hashing /Comparing

```js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is already in use'],
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: [true, 'email is already in use'],
    }
}, {timestamps: true, collection: "usersNew", versionKey: false});

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

userSchema.methods.isValidPassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
```
```js
export const login = async (req, res) => {
    const {username, password} = matchedData(req);
    const user = await User.findOne({username});
    if (!user) {
        res.status(401).json({error: 'Username does not exist'});
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).send(user);
};
```
### MongoDB Connection
```js
// File: `src/config/db.js`
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);  //MONGODB_URI=mongodb://localhost:27017/your-db-name
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); //Any non-zero value (like 1) indicates an error or abnormal termination.
    }
};

export default connectDB;
```
### Controller to Save Data (Express 5, no need to tray-catch)
```js
// File: `src/controllers/user.controller.js`
import { matchedData } from 'express-validator';
import { User } from '../models/user.model.js';

const createUser = async (req, res, next) => {
    const data = matchedData(req); // Picks validated fields only
    const user = new User(data);
    await user.save();
    res.status(201).json(user);
};

export default createUser;
```
### Error handling
in `app.js`, the Error Handler middleware goes after all routes
```js
// File: `src/middlewares/errorHandler.js`
const errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: err.message });
};

export default errorHandler;
```
### Run Time Errors
- Somthing like missing params — that’s runtime behavior, so it's handled in routes/controllers or global error handlers.
- Mongoose schemas handle:
  - Validation (e.g., required, minLength)
  - Hooks (pre, post)
  - Defaults
