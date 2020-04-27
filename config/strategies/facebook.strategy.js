const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../../models/userModel');

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
        const query = { 'facebook.id': profile.id };

        User.findOne(query, (err, user) => {
          if (user) {
            console.log('user found');
            done(null, user);
          } else {
            console.log('user not found');
            var user = new User();

            user.displayName = profile.displayName;

            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;

            user.save();
            done(null, user);
          }
        });
      }
    )
  );
};
