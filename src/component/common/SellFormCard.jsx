"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

function SellFormCard({ onClose }) {
  const [properties, setProperties] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    aadhar: "",
    email: "",
    address: "",
    pinCode: "",
    location: "",
    cost: "",
    documents: null,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === "documents") {
        setFormData({ ...formData, documents: files[0] });
      } else if (name === "images") {
        setFormData({ ...formData, images: Array.from(files) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProperty = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setProperties((prev) => [...prev, newProperty]);
    console.log([...properties, newProperty]);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 max-h-[90vh] overflow-y-auto">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition"
        >
          <FaTimes size={18} />
        </button>

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            List Your Property
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter property details below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Row 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
            <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
          </div>
            <Input
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              placeholder="Enter Your Aadhaar Number"
              full
            />

          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Property Address"
            full
          />
          {/* Pin Code */}
          <Input
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="Pin Code"
            full
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="City / Location" />
            <Input name="cost" type="number" value={formData.cost} onChange={handleChange} placeholder="Property Price" />
          </div>

          {/* File Uploads */}
          <div className="grid md:grid-cols-2 gap-6">
            <FileUpload
              label="Property Documents (PDF)"
              name="documents"
              accept=".pdf"
              onChange={handleChange}
            />
            <FileUpload
              label="Property Images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
}

/* Reusable Clean Input */
function Input({ name, value, onChange, placeholder, type = "text", full }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      required
      className={`border border-gray-300 rounded-lg px-4 py-3 text-sm 
      focus:outline-none focus:border-gray-900 transition
      ${full ? "w-full" : ""}`}
    />
  );
}

/* Reusable Clean File Upload */
function FileUpload({ label, name, accept, multiple, onChange }) {
  return (
    <label className="flex flex-col border border-gray-300 rounded-lg p-4 text-sm text-gray-600 hover:border-gray-900 transition cursor-pointer">
      {label}
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        className="mt-2 text-xs"
        required
      />
    </label>
  );
}
export default SellFormCard;