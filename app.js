const bodyParser = require('body-parser');
      express = require('express');
      mongoose = require('mongoose');

// create global app object
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongoDb
const mongoDb = require("./database/mongo_db");

mongoDb.connect();

require('./models/User');
require('./models/Device');

app.use(require("./routes"));

/// catch 404 and forward to built-in error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const server = app.listen(3000, () => {
  console.log(`Example app listening at ${server.address()}${3000}`);
});

