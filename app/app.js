const express = require("express");
const bodyParser = require("body-parser");

const App = express();
const Product = require("./routes/product");

App.use(bodyParser.json());
App.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Routes
App.use("/product", Product);

// error handling middleware
App.use((req, res, next) => {
 const error = new Error('Not found')
 error.status = 404
 next(error)

})

App.use(function (error, req, res, next) {
  console.log(error)
  res.status( error.status || 500)
  res.json( error );
});

module.exports = App;
