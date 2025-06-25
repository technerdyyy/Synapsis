import { gapi } from "gapi-script";
/* global google */

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

let tokenClient;
let accessToken = null;

export const initializeGapi = async () => {
  return new Promise((resolve, reject) => {
    gapi.load('client', async () => {
      try {
        await gapi.client.init({
          apiKey: '', // optional if using only access_token
          discoveryDocs: [DISCOVERY_DOC],
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const signInToGoogle = () => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
          if (response.error) {
            reject(response);
          } else {
            accessToken = response.access_token;
            gapi.client.setToken({ access_token: accessToken });
            resolve();
          }
        },
      });
    }
    tokenClient.requestAccessToken();
  });
};

export const getUpcomingEvents = async (maxResults = 10) => {
  try {
    const now = new Date().toISOString();
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: now,
      showDeleted: false,
      singleEvents: true,
      maxResults,
      orderBy: 'startTime',
    });
    return response.result.items || [];
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
};

export const isGoogleSignedIn = () => {
  return !!accessToken;
};
