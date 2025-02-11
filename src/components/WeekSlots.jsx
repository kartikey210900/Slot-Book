import React, { useState, useCallback } from "react";
import CalendarModal from "./CalendarModal";
function WeekSlots({
  currentDate,
  availableSlots,
  darkMode,
  onDeleteSlot,
  onUpdateSlot,
  onChangeWeek = () => {}, // Default no-op function
}) {
  const [editingSlot, setEditingSlot] = useState(null);

  // Generate week dates
  const getWeekDates = useCallback(() => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [currentDate]);

  // Get slots for a specific date
  const getSlotsForDate = useCallback(
    (date) => {
      return availableSlots.filter((slot) => {
        const slotDate = new Date(slot.date);
        return slotDate.toDateString() === date.toDateString();
      });
    },
    [availableSlots]
  );

  // Handle slot editing
  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
  };

  // Handle update slot
  const handleUpdateSlot = () => {
    if (editingSlot) {
      onUpdateSlot(editingSlot);
      setEditingSlot(null);
    }
  };

  // Safe week navigation
  const navigateWeek = useCallback(
    (direction) => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));

      // Safely call onChangeWeek if it's a function
      if (typeof onChangeWeek === "function") {
        onChangeWeek(newDate);
      } else {
        console.warn("Week change function is not provided");
      }
    },
    [currentDate, onChangeWeek]
  );

  const weekDates = getWeekDates();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`mb-6 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-xl font-bold ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Week Availability
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateWeek("prev")}
            className={`p-2 rounded ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            ← Prev Week
          </button>
          <span className="font-medium">
            {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
          </span>
          <button
            onClick={() => navigateWeek("next")}
            className={`p-2 rounded ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
          >
            Next Week →
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => (
          <div
            key={date.toISOString()}
            className={`border rounded-lg p-2 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="text-center mb-2">
              <span
                className={`font-semibold ${
                  darkMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {days[index]} {date.getDate()}
              </span>
            </div>

            <div className="space-y-2">
              {getSlotsForDate(date).map((slot) => (
                <div
                  key={slot.id}
                  className={`flex justify-between items-center p-1 rounded ${
                    darkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {editingSlot && editingSlot.id === slot.id ? (
                    // Editing Mode
                    <div className="flex space-x-2 w-full">
                      <input
                        type="time"
                        value={editingSlot.startTime}
                        onChange={(e) =>
                          setEditingSlot({
                            ...editingSlot,
                            startTime: e.target.value,
                          })
                        }
                        className="w-1/2 p-1 rounded"
                      />
                      <input
                        type="time"
                        value={editingSlot.endTime}
                        onChange={(e) =>
                          setEditingSlot({
                            ...editingSlot,
                            endTime: e.target.value,
                          })
                        }
                        className="w-1/2 p-1 rounded"
                      />
                      <button
                        onClick={handleUpdateSlot}
                        className="text-green-500 hover:text-green-700"
                      >
                        ✓
                      </button>
                    </div>
                  ) : (
                    // Display Mode
                    <>
                      <span className="text-xs">
                        {slot.startTime} - {slot.endTime}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditSlot(slot)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => onDeleteSlot(slot.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✖
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeekSlots;
