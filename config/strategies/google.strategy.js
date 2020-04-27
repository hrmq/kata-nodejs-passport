const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function () {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3001/auth/google/callback',
      },
      function (req, accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
};
