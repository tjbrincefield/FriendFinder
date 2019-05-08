// Dependencies
var express = require("express");

// Create an instance of the express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the express.static middleware to serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Spring21",
  database: "wishes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// Root get route
app.get("/api/wishes", function(req, res) {
  connection.query("SELECT * FROM wishes;", function(err, data) {
    if (err) {
      throw err;
    }

    // Test it
    // console.log('The solution is: ', data);

    res.json(data);
  });
});

// Post route -> back to home
app.post("/api/wishes", function(req, res) {
  // Test it
  // console.log('You sent, ' + req.body.wish);

  // Test it
  // res.send('You sent, ' + req.body.wish)

  connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
    if (err) {
      throw err;
    }

    res.status(201).end();
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
