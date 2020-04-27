var express = require('express');
var passport = require('passport');
var router = express.Router();

// Google Routes
router.route('/google/callback').get(
  passport.authenticate('google', {
    successRedirect: '/users',
    failureRedirect: '/error',
  })
);

router.route('/google').get(
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
);

// Facebook Routes
router.route('/facebook/callback').get(
  passport.authenticate('facebook', {
    successRedirect: '/users',
    failureRedirect: '/error',
  })
);

router.route('/facebook').get(
  passport.authenticate('facebook', {
    scope: ['email'],
  })
);

module.exports = router;
