import React, { useState } from "react";
import Navigation from "./components/Navigation";
import WeekSlots from "./components/WeekSlots";
import AvailabilityManager from "./components/AvailabilityManager";
import EditProfileModal from "./components/EditProfileModal";

function App() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "",
    timezone: "UTC",
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleWeekChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const addSlot = (slotData) => {
    // Validate slot doesn't already exist
    const isDuplicate = availableSlots.some(
      (slot) =>
        slot.date === slotData.date &&
        slot.startTime === slotData.startTime &&
        slot.endTime === slotData.endTime
    );

    if (isDuplicate) {
      alert("This slot already exists!");
      return;
    }

    setAvailableSlots([...availableSlots, slotData]);
  };

  const deleteSlot = (slotId) => {
    setAvailableSlots(availableSlots.filter((slot) => slot.id !== slotId));
  };

  const updateSlot = (updatedSlot) => {
    setAvailableSlots(
      availableSlots.map((slot) =>
        slot.id === updatedSlot.id ? updatedSlot : slot
      )
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navigation
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        userProfile={userProfile}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WeekSlots
          currentDate={currentDate}
          availableSlots={availableSlots}
          darkMode={darkMode}
          onDeleteSlot={deleteSlot}
          onUpdateSlot={updateSlot}
          onChangeWeek={handleWeekChange}
        />

        <AvailabilityManager darkMode={darkMode} onAddSlot={addSlot} />
      </main>
    </div>
  );
}

export default App;
