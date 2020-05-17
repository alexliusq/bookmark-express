const passport = require('passport');

// const allowUrl = ['public', 'nonprivate', 'home'];
const whiteList = [];

const multipleUsersEnabled = require('../config/multiple_users').enabled;

const authenticationMiddleware = (req, res, next) => {
  if (!multipleUsersEnabled) next();

  if (whiteList.find((url) => url.startsWith(req.baseUrl))) {
    next();
  }

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).send('Unauthorised').end(); }

    req.user = user; // Forward user information to the next middleware
    next();
  })(req, res, next);
};

module.exports = authenticationMiddleware;
