const router = require('express').Router()

router.get('/users', (req, res, next) => {
  res.json('response')
})

module.exports = router
