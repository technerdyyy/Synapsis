import React, { useEffect } from "react";
import { useCalendar } from "../../context/CalendarContext";
import Header from "./header";
import CalendarConnection from "../calendar/connectButton";
import EventsList from "../calendar/eventList";

const Dashboard = () => {
  const { isGoogleConnected, fetchEvents } = useCalendar();

  useEffect(() => {
    if (isGoogleConnected) {
      fetchEvents();
    }
  }, [isGoogleConnected]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <CalendarConnection />

          {isGoogleConnected && <EventsList />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
