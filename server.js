const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//require('./services/auth/passport');

const users = require('./routes/api/users');
const auth = require('./routes/auth');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Logged into MLab URI = ${db}`))
  .catch(err => console.log('Error Mongo : ' + err));

// ================= PASSPORT MIDDLEWARE ========================
app.use(passport.initialize());
// Passport Config - JWT strategy for local email-password & Google
require('./config/passport')(passport);

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
