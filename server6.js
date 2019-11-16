// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var Customer = require("./Customer.js")
var tables = require("./tables.js")
var waitList = require("./waitlist.js")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});


// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;

  console.log(newTable);


  // We then add the json the user sent to the character array
  if(tables.length < 5) {
    tables.push(newTable);
  }else {waitList.push(newTable)}

  // We then display the JSON to the users
  res.json(newTable);
  console.log(tables);
  console.log("--------------------------------------------")
  console.log(waitList);
  
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
