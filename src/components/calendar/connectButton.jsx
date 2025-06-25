import React from "react";
import { useCalendar } from "../../context/CalendarContext";
import Button from "../ui/button";
import Card from "../ui/card";
import { Calendar, CheckCircle } from "lucide-react";

const CalendarConnection = () => {
  const {
    isGoogleConnected,
    connectGoogleCalendar,
    loading,
    gapiInitialized,
  } = useCalendar();

  if (!gapiInitialized) {
    return (
      <Card className="p-6 text-center">
        <p>Initializing Google Calendar...</p>
      </Card>
    );
  }

  if (isGoogleConnected) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Google Calendar Connected
            </h3>
            <p className="text-sm text-gray-600">
              Your calendar is successfully connected
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 text-center">
      <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Connect Your Google Calendar
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Connect your Google Calendar to view and summarize your upcoming events
      </p>
      <Button
        onClick={connectGoogleCalendar}
        loading={loading}
        className="w-full"
      >
        Connect Google Calendar
      </Button>
    </Card>
  );
};

export default CalendarConnection;
