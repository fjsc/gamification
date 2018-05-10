const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.json('login')
})

module.exports = router
