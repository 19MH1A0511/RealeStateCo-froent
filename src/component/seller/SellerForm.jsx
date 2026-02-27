"use client";
import React, { useState } from "react";
import { FaUpload, FaTimes } from "react-icons/fa";

function SellPropertyPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    price: "",
    description: "",
    images: [],
    documents: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const fileArray = Array.from(files);

      if (name === "images") {
        const newImages = [...formData.images, ...fileArray];
        setFormData({ ...formData, images: newImages });

        const previews = fileArray.map((file) =>
          URL.createObjectURL(file)
        );
        setPreviewImages((prev) => [...prev, ...previews]);
      }

      if (name === "documents") {
        const newDocs = [...formData.documents, ...fileArray];
        setFormData({ ...formData, documents: newDocs });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    const updatedPreviews = [...previewImages];

    URL.revokeObjectURL(updatedPreviews[index]);

    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setFormData({ ...formData, images: updatedImages });
    setPreviewImages(updatedPreviews);
  };

  const removeDocument = (index) => {
    const updatedDocs = [...formData.documents];
    updatedDocs.splice(index, 1);
    setFormData({ ...formData, documents: updatedDocs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold text-gray-800">
            Sell Your Property
          </h1>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input name="firstName" label="First Name" onChange={handleChange} />
              <Input name="lastName" label="Last Name" onChange={handleChange} />
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

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Property Description
              </label>
              <textarea
                name="description"
                rows="5"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Upload Property Images
              </label>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-600 transition bg-gray-50">
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
                />
              </label>
            </div>

            {/* Image Preview with Remove */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="h-28 w-full object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-500 hover:text-white transition"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Documents Upload */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Upload Documents (PDF, DOC)
              </label>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-600 transition bg-gray-50">
                <FaUpload size={20} className="text-gray-400 mb-2" />
                <span className="text-gray-500 text-sm">
                  Click to upload documents
                </span>
                <input
                  type="file"
                  multiple
                  name="documents"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Document List with Remove */}
            {formData.documents.length > 0 && (
              <div className="space-y-3">
                {formData.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">
                      {doc.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-gray-500 hover:text-red-500 transition"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Submit Property
            </button>

          </form>
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
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
      />
    </div>
  );
}

export default SellPropertyPage;