// This is only for testing React based authentication using both
// local jwt and google jwt strategy

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Load user model
require('./models/common/User');

// Load Routes
const users = require('./routes/api/users');
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys');

// DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Logged into MLab URI = ${db}`))
  .catch(err => console.log('Error Mongo : ' + err));

// Start express as app.

const app = express();

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//======================ROUTERS=================================
app.use('/api/users', users);
app.use('/auth', auth);

//=============== Server STATIC ASSETS if in production ========
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Baand server (power by ma-babi) running on port ${port}`);
});
