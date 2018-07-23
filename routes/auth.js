const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.get('/google', (req, res) => {
//   res.send('auth');
// });

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/lobby');
  }
);

module.exports = router;
