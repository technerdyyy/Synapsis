import React from "react";
import Card from "../ui/card";
import { Calendar, Clock, MapPin, Bot } from "lucide-react";

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString();
  };

  const formatDateOnly = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getEventTime = () => {
    if (event.start?.dateTime) {
      return formatDate(event.start.dateTime);
    } else if (event.start?.date) {
      return `All day - ${formatDateOnly(event.start.date)}`;
    }
    return "No time specified";
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {event.summary || "Untitled Event"}
          </h3>
        </div>

        <div className="flex items-start space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{getEventTime()}</span>
        </div>

        {event.location && (
          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
        )}

        {event.description && (
          <div className="text-sm text-gray-700">
            <p className="line-clamp-2">{event.description}</p>
          </div>
        )}

        {event.aiSummary && (
          <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-400">
            <div className="flex items-start space-x-2">
              <Bot className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">
                  AI Summary
                </p>
                <p className="text-sm text-blue-700">{event.aiSummary}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
