export const formatEventDate = (event) => {
    if (event.start?.dateTime) {
      return new Date(event.start.dateTime).toLocaleDateString()
    } else if (event.start?.date) {
      return new Date(event.start.date).toLocaleDateString()
    }
    return 'No date'
  }
  
  export const formatEventTime = (event) => {
    if (event.start?.dateTime) {
      return new Date(event.start.dateTime).toLocaleTimeString()
    }
    return 'All day'
  }
  
  export const isEventToday = (event) => {
    const today = new Date().toDateString()
    const eventDate = event.start?.dateTime || event.start?.date
    if (!eventDate) return false
    
    return new Date(eventDate).toDateString() === today
  }