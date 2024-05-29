## Installation
- ```npm init -y```
- ```npm i express```
- ```npm i -D nodemon```
- ```npm run start:dev```
### package.json:
```json
{
  "name": "express",
  "version": "1.0.0",
  "description": "",
  "main": "index.mjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:dev": "nodemon ./src/index.mjs",
    "start": "node ./src/index.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.19.2"
  },
  "type": "module",
  "devDependencies": {
    "nodemon": "^3.1.1"
  }
}
```
### index.js:
```javascript
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
```
## API Requests
```javascript
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.status(500).send("Hello");
});

app.get("/api/users", (req, res) => {
  res.status(200).send([
    { id: 1, username: "reza", displayName: "Reza" },
    { id: 2, username: "maneli", displayName: "Maneli" },
    { id: 3, username: "fariba", displayName: "Fariba" },
    { id: 4, username: "david", displayName: "David" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
```
