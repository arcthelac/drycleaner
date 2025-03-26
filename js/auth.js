import { getDecodedCredentials } from './credentials.js';

// Initialize Google API client
async function initClient() {
    try {
        const credentials = getDecodedCredentials();
        
        // Load the Google API client
        await gapi.client.init({
            apiKey: credentials.apiKey,
            clientId: credentials.clientId,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
        });

        console.log('Google API client initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing Google API client:', error);
        return false;
    }
}

// Handle authentication
async function handleAuth() {
    try {
        const auth2 = gapi.auth2.getAuthInstance();
        if (!auth2.isSignedIn.get()) {
            await auth2.signIn();
        }
        return true;
    } catch (error) {
        console.error('Authentication error:', error);
        return false;
    }
}

// Check authentication status
async function checkAuthStatus() {
    try {
        const auth2 = gapi.auth2.getAuthInstance();
        return auth2.isSignedIn.get();
    } catch (error) {
        console.error('Error checking auth status:', error);
        return false;
    }
}

// Refresh token if needed
async function refreshToken() {
    try {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2.isSignedIn.get()) {
            await auth2.currentUser.get().reloadAuthResponse();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
    }
}

// Load Google API client
function loadGoogleAPI() {
    return new Promise((resolve, reject) => {
        gapi.load('client:auth2', async () => {
            try {
                const success = await initClient();
                if (success) {
                    resolve(true);
                } else {
                    reject(new Error('Failed to initialize Google API client'));
                }
            } catch (error) {
                reject(error);
            }
        });
    });
}

export { loadGoogleAPI, handleAuth, checkAuthStatus, refreshToken }; 