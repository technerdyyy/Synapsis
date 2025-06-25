import { gapi } from 'gapi-script'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

export const initializeGapi = async () => {
  try {
    await gapi.load('client:auth2', async () => {
      await gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOC],
        scope: SCOPES
      })
    })
  } catch (error) {
    console.error('Error initializing Google API:', error)
    throw error
  }
}

export const signInToGoogle = async () => {
  try {
    const authInstance = gapi.auth2.getAuthInstance()
    await authInstance.signIn()
    return true
  } catch (error) {
    console.error('Error signing in to Google:', error)
    throw error
  }
}

export const getUpcomingEvents = async (maxResults = 10) => {
  try {
    const now = new Date().toISOString()
    const response = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: now,
      showDeleted: false,
      singleEvents: true,
      maxResults: maxResults,
      orderBy: 'startTime'
    })
    return response.result.items || []
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    throw error
  }
}

export const isGoogleSignedIn = () => {
  const authInstance = gapi.auth2.getAuthInstance()
  return authInstance && authInstance.isSignedIn.get()
}