const express = require('express');
const router = express.Router();
const facebook = require('../services/facebook')(
  process.env.FACEBOOK_APP_ID,
  process.env.FACEBOOK_APP_SECRET
);

router.use('/', (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.user.facebook) {
    facebook.getImage(req.user.facebook.token, function (results) {
      req.user.image = results.url;
      res.render('users', {
        user: req.user,
      });
    });
  } else {
    res.render('users', {
      user: req.user,
    });
  }
});

module.exports = router;
