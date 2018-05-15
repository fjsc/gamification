const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const credentials = require('../credentials')

// load up the user model
// var User = require('../app/models/user')

// load the auth variables
var configAuth = require('./auth')

module.exports = function (passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use(new GoogleStrategy({
    clientID: credentials.installed.client_id,
    clientSecret: credentials.installed.client_secret,
    callbackURL: credentials.installed.redirect_uris[0]
  },
  function (token, refreshToken, profile, done) {
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function () {
      // try to find the user based on their google id
      User.findOne({
        'google.id': profile.id
      }, function (err, user) {
        if (err)
          return done(err)
        if (user) {
          // if a user is found, log them in
          return done(null, user)
        } else {
          // if the user isnt in our database, create a new user
          var newUser = new User()
          // set all of the relevant information
          newUser.google.id = profile.id
          newUser.google.token = token
          newUser.google.name = profile.displayName
          newUser.google.email = profile.emails[0].value // pull the first email

          // save the user
          newUser.save(function (err) {
            if (err)
              throw err
            return done(null, newUser)
          })
        }
      })
    })
  }))
}
