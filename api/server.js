const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const path = require('path')
const compression = require('compression')

const auth = require('./config/auth')

const app = express()
auth(passport)

app.use(compression())
app.use(passport.initialize())
app.use(require('method-override')())
app.use(cookieSession({
  name: 'session',
  keys: ['5tr4t1o-g4m1f1cation-cOmpR3ssion-keY']
}))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, '../web/build')))
app.use(require('./routes'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
