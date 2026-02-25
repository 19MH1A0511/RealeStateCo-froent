"use client";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

function SellPropertyPage() {
  const [formData, setFormData] = useState({
    title: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    price: "",
    description: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const fileArray = Array.from(files);
      setFormData({ ...formData, images: fileArray });
      setPreviewImages(fileArray.map((file) => URL.createObjectURL(file)));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="min-h-screen bg-[#f8f6f2] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-800">
            List Your Property
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Reach serious buyers with a professionally listed property
          </p>
        </div>

        {/* Form Layout */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Left Info Section */}
          <div className="md:col-span-1">
            <div className="sticky top-20 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Why Sell With Us?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We connect property owners with verified buyers and provide
                professional exposure across digital platforms.
              </p>
              <div className="h-1 w-16 bg-amber-600 rounded"></div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="md:col-span-2 bg-white p-10 rounded-2xl shadow-sm border border-gray-200">

            <form onSubmit={handleSubmit} className="space-y-8">

              <div className="grid md:grid-cols-2 gap-6">
                <Input name="title" label="Property Title" onChange={handleChange} />
                <Input name="ownerName" label="Owner Full Name" onChange={handleChange} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input name="email" type="email" label="Email Address" onChange={handleChange} />
                <Input name="phone" label="Phone Number" onChange={handleChange} />
              </div>

              <Input name="address" label="Property Address" onChange={handleChange} />

              <div className="grid md:grid-cols-2 gap-6">
                <Input name="city" label="City" onChange={handleChange} />
                <Input name="price" type="number" label="Property Price ($)" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Property Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Upload Property Images
                </label>

                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-amber-600 transition bg-gray-50">
                  <FaUpload size={20} className="text-gray-400 mb-2" />
                  <span className="text-gray-500 text-sm">
                    Click to upload images
                  </span>
                  <input
                    type="file"
                    multiple
                    name="images"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              {/* Preview */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="preview"
                      className="h-28 w-full object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition"
              >
                Submit Property
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

function Input({ name, label, type = "text", onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition"
      />
    </div>
  );
}

export default SellPropertyPage;