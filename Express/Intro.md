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
const mockData = [
  { id: 1, username: "reza", displayName: "Reza" },
  { id: 2, username: "maneli", displayName: "Maneli" },
  { id: 3, username: "fariba", displayName: "Fariba" },
  { id: 4, username: "david", displayName: "David" },
];
app.get("/", (req, res) => {
  res.status(500).send("Hello");
});

app.get("/api/users", (req, res) => {
  res.status(200).send(mockData);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
```
### Route Parameters
```javascript
// URL: http://localhost:3000/api/users/1
// Response: {"id":1,"username":"reza","displayName":"Reza"}

app.get("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).send({ msg: "Invalid id" });
  const findUser = mockData.find((user) => user.id == parsedId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});
```
### Query string and redirection
We can use `req.query` to get access to the query params
```javascript
// URL: http://localhost:3000?data=11&reza=100

app.get("/", (req, res) => {
  const query = new URLSearchParams(req.query).toString();
  res.redirect("/api/users?" + query);
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  res.status(200).send(mockData);
});
```
```javascript
// URL: http://localhost:3000/api/users?filter=username&value=i

app.get("/api/users", (req, res) => {
  const { filter, value } = req.query;
  const filteredUsers = mockData.filter((x) => x[filter].includes(value));
  res.status(200).send(filteredUsers);
});
```
### Post Request
```javascript
import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockData = [
  { id: 1, username: "reza", displayName: "Reza" },
  { id: 2, username: "maneli", displayName: "Maneli" },
  { id: 3, username: "fariba", displayName: "Fariba" },
  { id: 4, username: "david", displayName: "David" },
];

app.post("/api/users", (req, res) => {
  const body = req.body;
  const newUser = { id: mockData[mockData.length - 1].id + 1, ...body };
  mockData.push(newUser);
  return res.status(201).send(newUser);
});
```
### Delete Request
```javascript
import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockData = [
  { id: 1, username: "reza", displayName: "Reza" },
  { id: 2, username: "maneli", displayName: "Maneli" },
  { id: 3, username: "fariba", displayName: "Fariba" },
  { id: 4, username: "david", displayName: "David" },
];

app.delete("/api/users/:id", (req, res) => {
  const selectdeId = req.params.id;
  const selectedNumericId = parseInt(selectdeId);
  console.log(selectedNumericId);
  if (isNaN(selectedNumericId)) return res.sendStatus(400);
  const selectdeRecordIndex = mockData.findIndex(
    (x) => x.id === selectedNumericId
  );
  if (selectdeRecordIndex === -1) return res.sendStatus(404);
  mockData.splice(selectdeRecordIndex, 1);
  return res.sendStatus(200);
});
```
### Middleware & Put Request
```javascript
const userIndex = (req, res, next) => {
  const id = req.params.id;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).send({ err: "Bad request id" });
  const findIndex = mockData.findIndex((x) => x.id === parsedId);
  if (findIndex === -1) return res.status(404).send({ err: "invalid id" });
  req.findIndex = findIndex;
  next();
};

app.put("/api/users/:id", userIndex, (req, res) => {
  const findIndex = req.findIndex;
  const body = req.body;
  const updatedRecord = { id: mockData[findIndex].id, ...body };
  mockData.splice(findIndex, 1, updatedRecord);
  return res.status(200).send(updatedRecord);
});
```
