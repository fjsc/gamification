const router = require('express').Router()
const passport = require('passport')

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'], hostedDomain: 'stratio.com' }))

router.get('/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      return res.redirect('/auth')
    }
    req.session.token = user.token
    req.session.username = user.profile.displayName
    console.log(process.argv)
    res.redirect('/')
  })(req, res, next)
})

module.exports = router
