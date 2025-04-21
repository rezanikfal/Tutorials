## 4 main levels in MongoDB Atlas:
```
Organization ➝ Project ➝ Cluster ➝ Database
```

### 1. **Organization**
- Top-level container for multiple **Projects**.
- Think of it like a company or a team.

### 2. **Project**
- Contains **clusters** (i.e., MongoDB deployments).
- Access controls, alerts, and billing are usually set at the project level.

### 3. **Cluster**
- The actual MongoDB server deployment.
- Can be shared (M0–M5) or dedicated (M10+). M defines the size, performance, and pricing of a MongoDB deployment.
- Each cluster can hold **many databases**.

### 4. **Database**
- Logical container for collections (tables in SQL terms).
- Each **database** holds **collections** and **documents**.

## Introduction to mongosh


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
## MongoDB Basics Tutorial (Part 2)

### 6. Using $in & $nin
```javascript
// Find users whose names are in the list
db.users.find({ name: { $in: ["Alice", "Bob"] } })

// Find users whose names are NOT in the list
db.users.find({ name: { $nin: ["Charlie", "Diana"] } })

// Combine with another condition
db.users.find({
  age: { $gt: 20 },
  name: { $in: ["Alice", "Charlie"] }
})
```

### 7. Querying Arrays
```javascript
// Insert a document with an array
db.users.insertOne({
  name: "Eve",
  hobbies: ["reading", "hiking", "coding"]
})

// Match if array contains a value
db.users.find({ hobbies: "coding" })

// Match if array contains all specified values
db.users.find({ hobbies: { $all: ["reading", "coding"] } })

// Match array by length
db.users.find({ hobbies: { $size: 3 } })

// Match by position
db.users.find({ "hobbies.0": "reading" })
```

### 8. Deleting Documents
```javascript
// Delete one document
db.users.deleteOne({ name: "Alice" })

// Delete many documents
db.users.deleteMany({ age: { $lt: 30 } })

// Delete all documents in a collection
db.users.deleteMany({})

// Drop the collection entirely
db.users.drop()
```

### 9. Updating Documents
```javascript
// Update one document
db.users.updateOne(
  { name: "Bob" },
  { $set: { age: 29 } }
)

// Update many documents
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "young" } }
)

// Upsert: update if found, insert if not
db.users.updateOne(
  { name: "Charlie" },
  { $setOnInsert: { verified: false } },
  { upsert: true }
)

// Replace a document completely
db.users.replaceOne(
  { name: "Diana" },
  { name: "Diana", age: 28, city: "Dallas" }
)
```
