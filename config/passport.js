const LocalStrategy = require("passport-local").Strategy;
const personModel = require("../models/person");
module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      personModel
        .findOne({ username: username }, async function (err, user) {
          try {
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!(await user.verifyPassword(password))) {
              return done(null, false);
            }
            return done(null, user);
          } catch (e) {
            return done(e);
          }
        })
        .select("+password");
    })
  );
};
