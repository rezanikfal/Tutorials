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
