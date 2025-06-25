import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initializeGapi,
  signInToGoogle,
  getUpcomingEvents,
  isGoogleSignedIn,
} from "../lib/google";
import { summarizeEvent } from "../lib/openai";

const CalendarContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within CalendarProvider");
  }
  return context;
};

export const CalendarProvider = ({ children }) => {
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gapiInitialized, setGapiInitialized] = useState(false);

  useEffect(() => {
    const initGapi = async () => {
      try {
        await initializeGapi();
        setGapiInitialized(true);
        setIsGoogleConnected(isGoogleSignedIn());
      } catch (error) {
        console.error("Failed to initialize Google API:", error);
      }
    };

    initGapi();
  }, []);

  const connectGoogleCalendar = async () => {
    try {
      setLoading(true);
      await signInToGoogle();
      setIsGoogleConnected(true);
      await fetchEvents();
    } catch (error) {
      console.error("Failed to connect Google Calendar:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    if (!isGoogleConnected) return;

    try {
      setLoading(true);
      const calendarEvents = await getUpcomingEvents(10);

      const eventsWithSummaries = await Promise.all(
        calendarEvents.map(async (event) => {
          const summary = await summarizeEvent(event);
          return {
            ...event,
            aiSummary: summary,
          };
        })
      );

      setEvents(eventsWithSummaries);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isGoogleConnected,
    events,
    loading,
    gapiInitialized,
    connectGoogleCalendar,
    fetchEvents,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
