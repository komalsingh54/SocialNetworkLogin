const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');
const config = require('../_config');
const init = require('./init');

passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
},
((accessToken, refreshToken, profile, done) => {
  const searchQuery = {
    someID: profile.id,
  };

  const updates = {
    name: profile.displayName,
    someID: profile.id,
    familyName: profile.name.familyName,
    givenName: profile.name.givenName,
  };

  const options = {
    upsert: true,
  };

  User.findOneAndUpdate(searchQuery, updates, options, (err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
})));

// serialize user into the session
init();

module.exports = passport;
