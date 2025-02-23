### Request-Response cycle
- **Client** sends a request to a server, and the server processes this request and sends back a **response**.
- **Request** can include methods like `GET`, `POST`, `PUT`, or `DELETE`, as well as **headers** and any required **data** (in the case of a `POST` or `PUT`).
### Client vs Server's Perspective on Request/Response
- **Client** sends a `request` and **Server** receives a `request`. It includes:
  - HTTP Method (e.g., GET, POST, PUT, DELETE)
  - URL/URI
  - Headers (Authorization tokens, Content-Type, User-Agent, etc.)
  - Body (Optional)
- **Client** receives a `response` and **Server** sends a `response`. It includes:
  - Status Code
  - Headers
  - Body (Optional)
### Request Headers vs Response Headers
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
### Nodemon 
- A tool that helps with Node.js development by automatically restarting the server whenever it detects file changes in the project.
- To install: `npm install -D nodemon` (`--save-dev` is older version of `-D`)
### dotenv 
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
### Controllers
- Controllers handle the business logic for specific **routes**. They receive **requests**, process them (possibly interacting with a database), and send back **responses**.
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

router.get('/user/:id', userController.getUser);

module.exports = router;
```
