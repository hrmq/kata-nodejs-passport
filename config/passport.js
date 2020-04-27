const passport = require('passport');

module.exports = function (app) {
  // passport setup
  app.use(passport.initialize());
  app.use(passport.session());

  // place user object into the session
  passport.serializeUser((user, done) => done(null, user));

  // pull user back of the session
  passport.deserializeUser((user, done) => done(null, user));

  // plug in strategies
  require('./strategies/google.strategy')();
};
