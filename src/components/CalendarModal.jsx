import React, { useState } from "react";

function CalendarModal({
  isOpen,
  onClose,
  currentDate,
  onSelectDate,
  darkMode,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date(currentDate));

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Days from previous month to fill the grid
    const prevMonthDays = firstDay.getDay();

    const days = [];

    // Previous month days
    for (let i = 0; i < prevMonthDays; i++) {
      days.push(null);
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDateSelect = (date) => {
    if (date) {
      onSelectDate(date);
      onClose();
    }
  };

  const changeMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  if (!isOpen) return null;

  const calendarGrid = generateCalendarGrid();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`w-96 rounded-lg shadow-xl p-4 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeMonth(-1)}
            className={`p-2 rounded ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            ←
          </button>
          <span className="font-semibold">
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className={`p-2 rounded ${
              darkMode
                ? "hover:bg-gray-700 text-gray-300"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            →
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 text-center mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className={`font-semibold ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarGrid.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(date)}
              disabled={!date}
              className={`p-2 rounded ${
                !date
                  ? "opacity-0"
                  : `${
                      darkMode ? "hover:bg-gray-700 " : "hover:bg-gray-100 "
                    } ${
                      date.toDateString() === currentDate.toDateString()
                        ? darkMode
                          ? "bg-blue-800 text-white"
                          : "bg-blue-200"
                        : darkMode
                        ? "text-gray-300 "
                        : "text-gray-700"
                    }`
              }`}
            >
              {date ? date.getDate() : ""}
            </button>
          ))}
        </div>

        {/* Close Button */}
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${
              darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarModal;
