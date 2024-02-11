console.log("----Server js file----");
const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDB = require("./config/dbConnection");
const app = express();

const dotenv = require("dotenv").config()

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
});

//In postman write http://localhost:5000/api/contacts
//We will create routes in routes folder to keep this more clean
// app.get('/api/contacts', (req,res) => {
//     // res.send("Get all contacts");
//     res.status(200).send({"message":"Get all contacts"});
// });
app.use(express.json());
app.use("/api/contacts/", require("./routes/contactRoutes"));
app.use("/api/users/", require("./routes/userRoutes"));
app.use(errorHandler);

connectDB();

