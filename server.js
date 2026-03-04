const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serve index.html

// MySQL Connection
const db = mysql.createConnection({
host: "127.0.0.1",
user: "root",
password: "Vikash1704",
database: "college",
port: 3306
});

// Connect to MySQL
db.connect((err) => {
if (err) {
console.log("Database connection error:", err);
} else {
console.log("Database Connected");
}
});

// Insert Student
app.post("/register", (req, res) => {

console.log("Received Data:", req.body);

const { name, email, dob, department, phone } = req.body;

const sql = "INSERT INTO students(name,email,dob,department,phone) VALUES(?,?,?,?,?)";

db.query(sql, [name, email, dob, department, phone], (err, result) => {

if (err) {
console.log("Insert Error:", err);
res.send("Error inserting data");
} else {
console.log("Student inserted:", result);
res.send("Student Registered Successfully");
}

});

});

// Show all students
app.get("/students", (req, res) => {

const sql = "SELECT * FROM students";

db.query(sql, (err, result) => {

if (err) {
console.log(err);
res.send("Error fetching students");
} else {
res.json(result);
}

});

});

// Start Server
app.listen(3000, () => {
console.log("Server running on port 3000");
});