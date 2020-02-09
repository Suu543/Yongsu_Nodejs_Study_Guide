# CRUD Operations using Mongoose and MongoDB

- MongoDB is an open-source document database. It stores data in flexible, JSON-like documents.
- In relational databases we have <b>tables</b> and <b>rows</b>, in MongoDB we have <b>collections</b> and <b>documents</b>. A document can contain sub-documents.
- We don't have relationships between documents
- To connect to MongoDB:

```javascript
// Connecting to MongoDB
const mongoose = require("mongoose");
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose
  .connect("<MONGODB_URI", options)
  .then(() => console.log("Connected..."))
  .catch(err => console.log("Connection Failed..."));

// To store objects in MongoDB, we need to define a Mongoose schema first. The schema defines the shape of documents in MongoDB.

// Define a schema
const courseSchema = new mongoose.Schema({
  name: String,
  price: Number
});

// We can use a SchemaType object to provide additional details:

// Using a SchemaType object
const courseSchema = new mongoose.Schema({
  isPublished: { type: Boolean, default: false }
});

/*
- Supported types are:
  - String, Number, Date, Buffer (for storing binary data), Boolean and ObjectID.
  - Once we have a schema, we need to compile it into a model. A model is like a class. It's blueprint for creating objecs:
*/

// Creating a model
const Course = mongoose.model("Course", courseSchema);

// In database the name of this model's collection will be plural cases.
```

# CRUD Operations

```javascript
// Saving a document
let course = new Course({name: "..."});
course = await course.save();

// Querying documents
const courses = await Course
    .find({author: "Su", isPublished: true})
    .skip(10)
    .limit(10)
    .sort({name: 1, price: -1})
    .select({name: 1, price: 1});

//------------------------------------------------------------------------------------
// Updating a document (query first)
const course = await Course.findById(id);
if(!course) return;
course.set({name: '...'});
course.save();

// Updating a document (update first)
coust result = await Course.update({_id: id}, {
    $set: {name: "..."}
});

// Updating a document (update first) and return it
// You should set the new option to true to return the document after update was applied.
const result = await Course.findByIdAndUpdate({_id: id}, {
    $set: {name: "..."}
}, {new: true})

// Removing a document
const result = await Course.deleteOne({_id: id});
const result = await Course.deleteMany({_id: id});
const course = await Course.findByIdAndRemove(id);
```
