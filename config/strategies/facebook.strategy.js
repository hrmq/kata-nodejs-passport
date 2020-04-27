const passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function () {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: 'http://localhost:3001/auth/facebook/callback',
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        var user = {};

        user.displayName = profile.displayName;

        user.facebook = {};
        user.facebook.id = profile.id;
        user.facebook.token = accessToken;

        done(null, user);
      }
    )
  );
};
