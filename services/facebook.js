const OAuth = require('oauth').OAuth2;

const Facebook = function (facebookKey, facebookSecret) {
  const key = facebookKey;
  const secret = facebookSecret;

  const oauth = new OAuth(
    key,
    secret,
    'http://graph.facebook.com',
    null,
    'oauth2/token',
    null
  );

  const getImage = function (userKey, done) {
    oauth.get(
      'https://graph.facebook.com/v6.0/me/picture?redirect=false&type=large',
      userKey,
      function (err, results, res) {
        results = JSON.parse(results);
        done(results.data);
      }
    );
  };

  const getFriends = function (userKey, done) {
    oauth.get(
      'https://graph.facebook.com/v6.0/me/friends?redirect=false',
      userKey,
      function (err, results, res) {
        results = JSON.parse(results);
        done(results.data);
      }
    );
  };

  return {
    getImage,
  };
};

module.exports = Facebook;
