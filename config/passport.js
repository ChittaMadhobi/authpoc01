const GoogleStrategy = require('passport-google-oauth20').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const keys = require('./keys');
// Load user model
const User = mongoose.model('users');

//const User = require('../models/common/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  // jwt local strategy
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log('passport error: ' + err));
      //console.log('jwt_payload regular:' + jwt_payload);
    })
  );

  // Google oauth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        //console.log('accessToken:' + accessToken);
        //console.log('profile :' + JSON.stringify(profile));
        console.log(
          'gid:' +
            profile.id +
            ' name:' +
            profile.displayName +
            '  email:' +
            profile.emails[0].value
        );
        const image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf('?')
        );
        console.log('image: ' + image);
        //const image = 'abcd';

        const newUser = {
          googleID: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: image,
          registrationType: 'google-oauth',
          isConfirmed: true
        };

        User.findOne({ googleID: profile.id })
          .then(user => {
            if (user) {
              console.log('user exists');
              done(null, user);
            } else {
              console.log('user is null -- newUser:' + newUser);
              new User(newUser)
                .save()
                .then(user => {
                  console.log('saved new uesr :' + user);
                  done(null, user);
                })
                .catch(err => {
                  console.log('error while saving: ' + err);
                  done(err, null);
                });
            }
            console.log('user: ' + JSON.stringify(user));
          })
          .catch(err => {
            console.log('Error ...:' + err);
            done(err, null);
          });
      }
    )
  );
  //};
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
};
