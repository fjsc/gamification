const router = require('express').Router()

router.get('/get-user-info', (req, res, next) => {
  console.log(req.session)
  res.json({
    name: req.session.username
  })
})

module.exports = router
