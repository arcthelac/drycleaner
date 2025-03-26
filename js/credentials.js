
// Encoded credentials for Google API
const encodedCredentials = {
    apiKey: 'R09DU1BYLXAyVDY4SkRHc3BORC1mWmx4LWlCX3lWRUd2bEM=',
    clientId: 'OTkyMjE3MDUwNzk4LTI2cjg1MXZtdG5yNDdwODVjNGplcHRnaDFubDFoaDJnLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29t',
    spreadsheetId: 'YOUR_ENCODED_SPREADSHEET_ID'
};

// Function to decode credentials
function decodeCredential(encoded) {
    try {
        // In a real implementation, you would use proper encryption/decryption
        // This is a simple example using base64
        return atob(encoded);
    } catch (error) {
        console.error('Error decoding credentials:', error);
        throw new Error('Failed to decode credentials');
    }
}

// Function to get decoded credentials
function getDecodedCredentials() {
    return {
        apiKey: decodeCredential(encodedCredentials.apiKey),
        clientId: decodeCredential(encodedCredentials.clientId),
        spreadsheetId: decodeCredential(encodedCredentials.spreadsheetId)
    };
}

// Test function to verify credential handling
function testCredentials() {
    try {
        const decoded = getDecodedCredentials();
        console.log('Credentials successfully decoded');
        return true;
    } catch (error) {
        console.error('Credential test failed:', error);
        return false;
    }
}

export { getDecodedCredentials, testCredentials };
  