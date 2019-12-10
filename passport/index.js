


const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../model/admin');

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
              console.log("sai mat khau roi :"+password)
            return done(null, false, req.flash('error','Password incorrect' ));
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      if(!user)
          done(null, false);
      done(null, user);
      console.log(user);
  } catch (err) {
      done(err);
  }
  });
};
