const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../../models/userModel');

module.exports = function () {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3001/auth/google/callback',
      },
      function (req, accessToken, refreshToken, profile, done) {
        const query = { 'google.id': profile.id };

        User.findOne(query, function (err, user) {
          if (user) {
            console.log('user found');
            done(null, user);
          } else {
            console.log('user not found');
            const user = new User();

            user.email = profile.emails[0].value;
            user.image = profile._json.picture;
            user.displayName = profile.displayName;

            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;

            user.save();
            done(null, user);
          }
        });
      }
    )
  );
};
