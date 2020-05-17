const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/users');
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// options.jwtFromRequest = function(req) {
//   console.log( req.headers.authorization.split(' ')[1]);
//   debugger
//   return req.headers.authorization.split(' ')[1];
// }
options.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, async (payload, done) => {
    try {
      console.log('payload', payload);
      const user = await User.find(payload.user.email);

      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));
};
