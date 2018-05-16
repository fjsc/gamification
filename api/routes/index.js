const router = require('express').Router()

function loggedIn (req, res, next) {
  if (req.session && req.session.token) {
    next()
  } else {
    res.status(403).send('Forbidden access without session')
  }
}

router.use('/api', loggedIn, require('./api'))
router.use('/auth', require('./auth'))

module.exports = router
