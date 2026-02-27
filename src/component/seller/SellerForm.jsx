"use client";
import React, { useState, useEffect } from "react";
import SellerApiService from "@/services/seller.api.service";
import { toast } from "react-toastify";
import {FaUpload, FaTimes } from "react-icons/fa";
import CustomInputField from "../utils/commons/CustomInputField";

const sellerApiService = new SellerApiService();



const SellPropertyPage = () => {
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
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = 'firstName is required';
    if (!formData.lastName) errs.lastName = 'lastName is required';
    if (!formData.email) errs.email = 'email is required';
    if (!formData.phone) errs.phone = 'phone is required';
    if (!formData.address) errs.address = 'address is required';
    if (!formData.city) errs.city = 'city is required';
    if (!formData.price) errs.price = 'price is required';
    if (!formData.description) errs.description = 'description is required';
    return errs;
  };

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

  const handleBlur = field => {
    const validationErrors = validate();
    setErrors(prev => ({ ...prev, [field]: validationErrors[field] }));
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

  // const handleSubmit =async (e) => {
  //   try {
  //     e.preventDefault();
  //     const validationErrors = validate();
  //     if (Object.keys(validationErrors).length > 0) {
  //       setErrors(validationErrors);
  //       return;
  //     };
  //     const fileData = new FormData();

  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (value instanceof Date) {
  //         fileData.append(key, value.toISOString().split('T')[0]);
  //       } else if (Array.isArray(value) || typeof value === 'object') {
  //         fileData.append(key, JSON.stringify(value));
  //       } else if (value !== null && value !== '') {
  //         fileData.append(key, value);
  //       }
  //     });

  //     const response = await sellerApiService.createsellerproperty(formData);
  //     console.log("Property created:", response);
  //     if (response.success) {
  //       toast.success(response.message || "Property listed successfully!");
  //      handleClearForm();
  //     };
  //   } catch (error) {
  //     console.error("Error submitting property:", error);
  //   };
  // };

  const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const fileData = new FormData();
    // ✅ Append normal fields
    fileData.append("firstName", formData.firstName);
    fileData.append("lastName", formData.lastName);
    fileData.append("userId", localStorage.getItem("id")); 
    fileData.append("email", formData.email);
    fileData.append("phone", formData.phone);
    fileData.append("address", formData.address);
    fileData.append("city", formData.city);
    fileData.append("price", formData.price);
    fileData.append("description", formData.description);
    // ✅ Append images properly
    formData.images.forEach((image) => {
      fileData.append("images", image);
    });
    // ✅ Append documents properly
    formData.documents.forEach((doc) => {
      fileData.append("documents", doc);
    });
    // ✅ IMPORTANT: Send FormData
    const response = await sellerApiService.createsellerproperty(fileData);
    if (response.success) {
      toast.success(response.message || "Property listed successfully!");
      handleClearForm();
    };
  } catch (error) {
    console.error("Error submitting property:", error);
    toast.error("Something went wrong");
  }
};


  const handleClearForm = () => {
    setFormData({
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
        setPreviewImages([]);
      };

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-6 flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">
            Sell Your Property
          </h1>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Basic CustomInputFields */}
            <div className="grid md:grid-cols-2 gap-6">
              <CustomInputField name="firstName" label="First Name" onChange={handleChange} />
              <CustomInputField name="lastName" label="Last Name" onChange={handleChange} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <CustomInputField name="email" type="email" label="Email Address" onChange={handleChange} />
              <CustomInputField name="phone" label="Phone Number" onChange={handleChange} />
            </div>

            <CustomInputField name="address" label="Property Address" onChange={handleChange} />

            <div className="grid md:grid-cols-2 gap-6">
              <CustomInputField name="city" label="City" onChange={handleChange} />
              <CustomInputField name="price" type="number" label="Property Price ($)" onChange={handleChange} />
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
                <CustomInputField
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
                <CustomInputField
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


export default SellPropertyPage;