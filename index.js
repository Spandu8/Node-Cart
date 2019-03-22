const express = require("express");
const consign = require("consign");
const https = require("https");
const fs = require("fs");
var mongoose = require("mongoose");

const bodyParser = require("body-parser");

var publicDir = require('path').join(__dirname,'/public');
const app = express();

consign()
  .include("./libs/middleware.js")
  .into(app);

// Including route files
const register = require("./routes/registrationRoute");
const product = require("./routes/productRoute");


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use("/api", register);
app.use("/api", product);


app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://localhost:27017/OSS",
    { useNewUrlParser: true }
  );
var db = mongoose.connection;
  app.listen(3402);