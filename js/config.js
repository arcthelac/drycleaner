// Configuration for Google API
const config = {
    apiKey: process.env.GOOGLE_API_KEY || 'YOUR_API_KEY',
    clientId: process.env.GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID',
    spreadsheetId: process.env.SPREADSHEET_ID || 'YOUR_SPREADSHEET_ID',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
};

export default config; 