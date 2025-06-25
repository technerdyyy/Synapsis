import React from "react";
import { useCalendar } from "../../context/CalendarContext";
import EventCard from "./eventCard";
import LoadingSpinner from "../ui/spinner";
import Button from "../ui/button";
import { RefreshCw } from "lucide-react";

const EventsList = () => {
  const { events, loading, fetchEvents, isGoogleConnected } = useCalendar();

  if (!isGoogleConnected) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Connect your Google Calendar to view events
        </p>
      </div>
    );
  }

  if (loading && events.length === 0) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading your events...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
        <Button
          onClick={fetchEvents}
          loading={loading}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No upcoming events found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event, index) => (
            <EventCard key={event.id || index} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
