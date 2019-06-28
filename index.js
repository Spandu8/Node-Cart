const express = require("express");
const consign = require("consign");
var mongoose = require("mongoose");

const bodyParser = require("body-parser");
const socket = require("./public/socket");

var publicDir = require('path').join(__dirname,'/public');
const app = express();

consign()
  .include("./libs/middleware.js")
  .into(app);

// Including route files
const register = require("./routes/registrationRoute");
const product = require("./routes/productRoute");
const cart = require("./routes/cartRoute");



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use("/api", register);
app.use("/api", product);
app.use("/api", cart);



app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://localhost:27017/Product",
    { useNewUrlParser: true }
  );
var db = mongoose.connection;
  app.listen(3402);
