'use strict'

const Assert = require('assert')
const Google = require('googleapis')
const Sheets = Google.sheets('v4')

const oauth2Client = new Google.auth.OAuth2()
Assert(process.env.GOOGLE_API_SPREADSHEET, 'Missing env `GOOGLE_API_SPREADSHEET`')

const query = {
  'auth': oauth2Client,
  'spreadsheetId': process.env.GOOGLE_SPREADSHEET_ID,
  'range': 'Active Customers!A3:F2000',
  'majorDimension': 'ROWS'
}

// Get credentials
function getJwtClient () {
  const scopes = [
    'https://www.googleapis.com/auth/spreadsheets.readonly'
  ]
  const credentials = require(process.env.GOOGLE_API_SPREADSHEET)

  return new Google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    scopes,
    null
  )
}

// Authorize and fetch
function run () {
  getJwtClient().authorize((err, token) => {
    if (err) {
      return console.log(err)
    }
    oauth2Client.setCredentials(token)

    getData(query)
  })
}

run()

// Get values from Google Spreadsheet
function getData (query) {
  Sheets.spreadsheets.values.get(query, (err, data) => {
    if (err) {
      return console.error(err)
    }
    if (!data.values) {
      return console.log('No results!')
    } else {
      const result = parseResult(data.values)

      console.log(result)
      return result
    }
  })
}

function parseResult (data) {
  const headers = [].concat(...data.slice(0, 1))
  const values = data.slice(1)

  const headerMap = headers.reduce((acc, x, i) => {
    acc[x] = i
    return acc
  }, {})

  return values.reduce((acc, x) => {
    const wsId = x[headerMap['workspace_id']]

    acc[wsId] = {
      workspace_id: x[headerMap['workspace_id']],
      workspace_name: x[headerMap['workspace_name']],
      industry: x[headerMap['industry']],
      country: x[headerMap['country']],
      comments: x[headerMap['comments']]
    }

    return acc
  }, {})
}
