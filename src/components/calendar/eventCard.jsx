import { useCalendar } from "../../context/CalendarContext";

const EventCard = ({ event }) => {
  const { summarizeSingleEvent } = useCalendar();

  const handleSummary = () => {
    summarizeSingleEvent(event.id);
  };

  const dateTime = new Date(event.start?.dateTime || event.start?.date);

  return (
    <div className="p-4 border rounded-lg mb-4 shadow-sm">
      <h3 className="font-semibold text-lg">{event.summary}</h3>
      <p className="text-sm text-gray-500">{dateTime.toLocaleString()}</p>

      <div className="bg-blue-50 p-2 rounded mt-2">
        <strong className="text-blue-600">AI Summary</strong>
        <p className="text-sm mt-1">
          {event.aiSummary ?? "No summary generated yet."}
        </p>
        {!event.aiSummary && (
          <button
            onClick={handleSummary}
            className="mt-2 text-sm text-blue-500 underline"
          >
            Generate Summary
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
