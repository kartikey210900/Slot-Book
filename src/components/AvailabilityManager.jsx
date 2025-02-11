import React, { useState } from "react";

function AvailabilityManager({ darkMode, onAddSlot }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddSlot = () => {
    // Validate inputs
    if (!date || !startTime || !endTime) {
      alert("Please fill in all fields");
      return;
    }

    // Validate time range
    if (startTime >= endTime) {
      alert("End time must be after start time");
      return;
    }

    // Create slot object
    const newSlot = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      id: Date.now().toString(), // Unique identifier
    };

    // Call parent component's add slot function
    onAddSlot(newSlot);

    // Reset form
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div
      className={`rounded-lg shadow p-6 mt-6 ${
        darkMode
          ? "bg-gray-800 text-gray-100 border border-gray-700"
          : "bg-white text-gray-900"
      }`}
    >
      <h2
        className={`text-lg font-semibold mb-4 ${
          darkMode ? "text-gray-200" : "text-gray-900"
        }`}
      >
        Add Availability Slot
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="date"
              className={`block mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="startTime"
              className={`block mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="endTime"
              className={`block mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleAddSlot}
            className={`w-full p-2 rounded ${
              darkMode
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Add Slot
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvailabilityManager;
