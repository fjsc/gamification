const path = require('path')
const fs = require('fs')

// Load client secrets from a local file.
module.exports = JSON.parse(fs.readFileSync(path.join(__dirname, 'client_secret.json')).toString())
