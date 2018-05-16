const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const credentials = require('../credentials')

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  passport.use(new GoogleStrategy({
    clientID: credentials.installed.client_id,
    clientSecret: credentials.installed.client_secret,
    callbackURL: credentials.installed.redirect_uris[1]
  },
  (token, refreshToken, profile, done) => {
    if (profile._json.domain === 'stratio.com') {
      return done(null, {
        profile: profile,
        token: token
      })
    } else {
      // fail
      done(new Error('Invalid host domain'))
    }
  }))
}
