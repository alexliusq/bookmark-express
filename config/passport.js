const { JwtStrategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");

const User = require('../models/users');
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey; 

module.exports = (passport) => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      console.log('payload', jwt_payload);

      const user = await User.find(jwt_payload.user.email);
      
      if (!user) return done(null, false);
      return done(null, user);
    } catch(error) {
      return done(error, false);
    }
  }));
}