const bodyParser = require('body-parser');
      express = require('express');
      mongoose = require('mongoose');
      
     const  passport = require('passport');
// create global app object
const app = express();

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(expressSession);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDb
const mongoDb = require("./database/mongo_db");

mongoDb.connect();

require('./models/user');
require('./models/device');
// require('./models/token');

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

