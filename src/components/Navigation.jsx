import React, { useState } from "react";

function Navigation({ darkMode, toggleDarkMode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("UTC");

  const timezones = [
    {
      value: "UTC",
      label: "UTC (Coordinated Universal Time)",
      offset: "+00:00",
    },
    // North America
    { value: "EST", label: "EST (Eastern Standard Time)", offset: "-05:00" },
    { value: "CST", label: "CST (Central Standard Time)", offset: "-06:00" },
    { value: "PST", label: "PST (Pacific Standard Time)", offset: "-08:00" },
    { value: "AKST", label: "AKST (Alaska Standard Time)", offset: "-09:00" },
    {
      value: "HST",
      label: "HST (Hawaii-Aleutian Standard Time)",
      offset: "-10:00",
    },

    // South America
    { value: "BRT", label: "BRT (Brasília Time)", offset: "-03:00" },
    { value: "ART", label: "ART (Argentina Time)", offset: "-03:00" },

    // Europe
    { value: "GMT", label: "GMT (Greenwich Mean Time)", offset: "+00:00" },
    { value: "CET", label: "CET (Central European Time)", offset: "+01:00" },
    { value: "EET", label: "EET (Eastern European Time)", offset: "+02:00" },
    { value: "MSK", label: "MSK (Moscow Standard Time)", offset: "+03:00" },

    // Asia
    { value: "IST", label: "IST (India Standard Time)", offset: "+05:30" },
    { value: "CST_CN", label: "CST (China Standard Time)", offset: "+08:00" },
    { value: "JST", label: "JST (Japan Standard Time)", offset: "+09:00" },
    { value: "KST", label: "KST (Korea Standard Time)", offset: "+09:00" },

    // Australia
    {
      value: "AEST",
      label: "AEST (Australian Eastern Standard Time)",
      offset: "+10:00",
    },
    {
      value: "ACST",
      label: "ACST (Australian Central Standard Time)",
      offset: "+09:30",
    },

    // Africa
    { value: "CAT", label: "CAT (Central Africa Time)", offset: "+02:00" },
    { value: "EAT", label: "EAT (East Africa Time)", offset: "+03:00" },
    { value: "WAT", label: "WAT (West Africa Time)", offset: "+01:00" },

    // Middle East
    { value: "GST", label: "GST (Gulf Standard Time)", offset: "+04:00" },
    { value: "AST", label: "AST (Arabia Standard Time)", offset: "+03:00" },
  ];

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
    // TODO: Implement timezone change logic
    console.log(`Selected timezone: ${e.target.value}`);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    alert("Logout functionality to be implemented");
    setIsProfileOpen(false);
  };

  const handleEditProfile = () => {
    alert("Edit profile functionality to be implemented");
    setIsProfileOpen(false);
  };

  return (
    <nav
      className={`shadow-sm transition-colors duration-300 relative ${
        darkMode
          ? "bg-gray-800 text-gray-100 border-b border-gray-700"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1
              className={`
              text-2xl font-extrabold tracking-tight 
              bg-clip-text text-transparent bg-gradient-to-r 
              transition-all duration-300 
              ${
                darkMode
                  ? "from-blue-400 to-purple-600 hover:from-blue-300 hover:to-purple-500"
                  : "from-blue-600 to-purple-800 hover:from-blue-700 hover:to-purple-900"
              } 
              transform hover:scale-105 inline-block
            `}
            >
              SlotBook
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                id="timezone"
                value={selectedTimezone}
                onChange={handleTimezoneChange}
                className={`w-full rounded-md border p-2 text-sm transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label} {tz.offset}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-300 ${
                darkMode
                  ? "hover:bg-gray-700 text-yellow-400"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {darkMode ? (
                <i className="bi bi-sun"></i>
              ) : (
                <i className="bi bi-moon"></i>
              )}
            </button>
            <div className="relative">
              <button
                onClick={handleProfileToggle}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=John+Doe"
                  alt="User"
                />
                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  John Doe
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 text-gray-100 border border-gray-600"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <div className="py-1">
                    <div
                      className={`px-4 py-2 text-sm border-b ${
                        darkMode
                          ? "border-gray-600 text-gray-300"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      <p className="font-semibold">John Doe</p>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        john.doe@example.com
                      </p>
                    </div>

                    <button
                      onClick={handleEditProfile}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 flex items-center space-x-2 ${
                        darkMode
                          ? "hover:bg-gray-600 text-gray-200"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <i className="bi bi-pencil"></i>
                      <span>Edit Profile</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 flex items-center space-x-2 ${
                        darkMode
                          ? "hover:bg-red-600 hover:bg-opacity-20 text-red-400"
                          : "hover:bg-red-100 text-red-600"
                      }`}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navigation;
