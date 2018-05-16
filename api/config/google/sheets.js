const googleClient = require('./google')
const { google } = require('googleapis')

const spreadsheetId = '1g2cC3WD49qyh68svx0VJAWWHrfs6X4YJovUTIRZj5e4'
const sheets = google.sheets('v4')

function getAll (callback) {
  googleClient((auth) => {
    sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Hoja 1'
    }, callback)
  })
}

module.exports = {
  getAll
}
