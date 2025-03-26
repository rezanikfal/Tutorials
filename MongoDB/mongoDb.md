### Introduction to mongosh


`mongosh` is the MongoDB Shell — an interactive command-line interface used to connect to MongoDB databases and run queries. It supports JavaScript syntax and MongoDB commands, making it ideal for quick prototyping, learning, and database management.

To start `mongosh`, simply type `mongosh` in your terminal (assuming it's installed and added to your PATH).

### How to Run mongosh:
```bash
mongosh
```
If you're connecting to a local MongoDB server, this will open the shell connected to `mongodb://localhost:27017` by default.

To connect to a remote database:
```bash
mongosh "mongodb+srv://<username>:<password>@<cluster-url>/test"
```

### Common mongosh Commands:
```javascript
// Show current database
db

// List all databases
show dbs

// Switch or create database
use myDatabase

// Show all collections in the database
show collections

// Drop the current database
db.dropDatabase()

// Drop a collection
db.collectionName.drop()
```
 (assuming it's installed and added to your PATH). Once connected, you can switch databases using `use dbName` and interact with collections using commands like `find()`, `insertOne()`, etc.

---

### 1. Adding New Documents
```javascript
use myTutorialDB

// Insert one document
db.users.insertOne({
  name: "Alice",
  age: 30,
  email: "alice@example.com"
})

// Insert many documents
db.users.insertMany([
  { name: "Bob", age: 25, email: "bob@example.com" },
  { name: "Charlie", age: 35, email: "charlie@example.com" }
])
```

### 2. Finding Documents
```javascript
// Find all
db.users.find()

// Find one
db.users.findOne()

// Find with condition
db.users.find({ age: { $gt: 25 } })

// Projection
db.users.find({ age: { $gte: 25 } }, { name: 1, email: 1, _id: 0 })
```

### 3. Sorting & Limiting Data
```javascript
// Sort ascending
db.users.find().sort({ age: 1 })

// Sort descending
db.users.find().sort({ name: -1 })

// Limit and skip
db.users.find().limit(2)
db.users.find().skip(1)
db.users.find().sort({ age: 1 }).skip(1).limit(2)
```

### 4. Nested Documents
```javascript
// Insert with nested field
db.users.insertOne({
  name: "Diana",
  age: 28,
  address: { street: "123 Main St", city: "Dallas", zip: "75001" }
})

// Query nested field
db.users.find({ "address.city": "Dallas" })

// Update nested field
db.users.updateOne(
  { name: "Diana" },
  { $set: { "address.zip": "75002" } }
)

// Project nested field
db.users.find({ name: "Diana" }, { "address.city": 1, _id: 0 })
```

### 5. Operators & Complex Queries
```javascript
// Comparison operators
db.users.find({ age: { $gt: 25 } })
db.users.find({ age: { $lte: 30 } })

// Logical operators
db.users.find({ $and: [ { age: { $gt: 25 } }, { name: "Alice" } ] })
db.users.find({ $or: [ { name: "Bob" }, { name: "Charlie" } ] })
db.users.find({ age: { $not: { $gte: 30 } } })

// Existence and type check
db.users.find({ email: { $exists: true } })
db.users.find({ age: { $type: "number" } })
```

