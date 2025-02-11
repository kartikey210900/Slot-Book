import React, { useState, useEffect } from "react";

function EditProfileModal({ isOpen, onClose, darkMode, initialUser, onSave }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    timezone: "UTC",
  });

  const timezones = [
    {
      value: "UTC",
      label: "UTC (Coordinated Universal Time)",
      offset: "+00:00",
    },
    { value: "EST", label: "EST (Eastern Standard Time)", offset: "-05:00" },
    { value: "CST", label: "CST (Central Standard Time)", offset: "-06:00" },
    { value: "PST", label: "PST (Pacific Standard Time)", offset: "-08:00" },
    { value: "IST", label: "IST (India Standard Time)", offset: "+05:30" },
    { value: "JST", label: "JST (Japan Standard Time)", offset: "+09:00" },
  ];

  useEffect(() => {
    if (isOpen && initialUser) {
      setFormData({
        firstName: initialUser.firstName || "",
        lastName: initialUser.lastName || "",
        email: initialUser.email || "",
        phone: initialUser.phone || "",
        timezone: initialUser.timezone || "UTC",
      });
    }
  }, [isOpen, initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in all required fields");
      return;
    }

    // Call the onSave prop with updated profile
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div
        className={`relative w-full max-w-md mx-auto my-6 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        } rounded-lg shadow-xl`}
      >
        <div
          className={`flex items-start justify-between p-5 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h3 className="text-2xl font-semibold">Edit Profile</h3>
          <button
            onClick={onClose}
            className={`text-2xl font-semibold ${
              darkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={`w-full p-2 rounded border ${
                  darkMode
                    ? "bg-gray-700 text-gray-100 border-gray-600"
                    : "bg-white text-gray-900 border-gray-300"
                }`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className={`block mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
                darkMode
                  ? "bg-gray-700 text-gray-100 border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="timezone"
              className={`block mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className={`w-full p-2 rounded border ${
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

          <div
            className={`flex justify-end space-x-4 pt-4 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
