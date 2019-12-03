


const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../model/users');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({passReqToCallback:true, usernameField: 'email' }, (req,email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
          console.log(user);
        if (!user) {
          return done(null, false, req.flash('error', 'That email is not registered' ));
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
              console.log("sai mat khau roi ku :"+password)
            return done(null, false, req.flash('error','Password incorrect' ));
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
