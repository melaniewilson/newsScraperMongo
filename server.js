// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// requiring our Note and Article models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// scraping tools
var request = require("request");
var cheerio = require("cheerio");

// set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var PORT = process.env.PORT || 8080;

// initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// serve static content
app.use(express.static("public"));

// set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes and give the server access to them.
var routes = require("./controllers/scraper_controller.js");

app.use("/", routes);

mongoose.connect("mongodb://heroku_gnzk5747:4d2121nhgnfbdl1pfirsdepk9n@ds125262.mlab.com:25262/heroku_gnzk5747");

var db = mongoose.connection;

// show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// when logged into db through mongoose
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});
