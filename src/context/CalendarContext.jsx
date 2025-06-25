import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initializeGapi,
  signInToGoogle,
  getUpcomingEvents,
  isGoogleSignedIn,
} from "../lib/google";
import { summarizeEvent } from "../lib/openrouter";

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

      const eventsWithEmptySummary = calendarEvents.map((event) => ({
        ...event,
        aiSummary: null, // No summary yet
      }));

      setEvents(eventsWithEmptySummary);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const summarizeSingleEvent = async (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    try {
      const summary = await summarizeEvent(event);
      const updatedEvents = events.map((e) =>
        e.id === eventId ? { ...e, aiSummary: summary } : e
      );
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Failed to summarize event:", error);
    }
  };

  const value = {
    isGoogleConnected,
    events,
    loading,
    gapiInitialized,
    connectGoogleCalendar,
    fetchEvents,
    summarizeSingleEvent, // ✅ Add this
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
