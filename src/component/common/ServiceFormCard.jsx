"use client";
import React, { useState } from "react";

export default function ServiceFormCard({ type, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    alternateMobile: "",
    address: "",
    pinCode: "",
    city: "",
    type: type || "Interior",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted Successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
      
      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-8">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-500 hover:text-red-500 text-xl transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Service Enquiry
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Mobile Fields */}
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <input
            type="tel"
            name="alternateMobile"
            placeholder="Alternate Mobile Number"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            rows="3"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
          />

          {/* Pin + City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              required
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {/* Type Dropdown */}
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          >
            <option value="Interior">Interior</option>
            <option value="Construction">Construction</option>
            <option value="Inspection">Inspection</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Submit Enquiry
          </button>

        </form>
      </div>
    </div>
  );
}