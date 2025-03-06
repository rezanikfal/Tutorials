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
