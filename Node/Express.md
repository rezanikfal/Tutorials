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
    if (!/^\d+$/.test(req.params.id)) {
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
```javascript
const session = require('express-session');

app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 600000 }
}));

app.get('/set-session', (req, res) => {
    req.session.user = { username: 'JohnDoe' };
    res.send('Session set');
});

app.get('/get-session', (req, res) => {
    res.send(req.session.user || 'No session found');
});
```
- The **session middleware** from `express-session` is used to manage user sessions in an Express app.
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
