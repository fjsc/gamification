const router = require('express').Router()

router.use('/api', require('./api'))
router.use('/login', require('./login'))

module.exports = router
