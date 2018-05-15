const router = require('express').Router()

const { sheets } = require('../../config/google')

router.get('/get', (req, res, next) => {
  sheets.getAll((err, response) => {
    if (err) {
      res.status(500).send('Cannot get gamification data')
    }
    res.json(response.data.values)
  })
})

module.exports = router
