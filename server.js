// MAIN SERVER //

// DEPENDENCIES //
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/project_3';
const db = mongoose.connection;
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

// CONTROLLERS //
const sessionsController = require('./controllers/sessions.js');


// MIDDLEWARE //
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: "the-best-group-evva",
  resave: false,
  saveUninitialized: false
}));

// CONTROLLER ROUTES //
app.use('/sessions/', sessionsController);

// CONNECTION //
mongoose.connect(mongoUri);
db.once('open', function() {
  console.log('project_3 connected to MongoDB!');
  app.listen(port, function() {
    console.log(`Server port ${port} listening...`);
  });
});
