"use client";
import React, { useState, useEffect } from "react";
import SellerApiService from "@/services/seller.api.service";
import { toast } from "react-toastify";
import { FaUpload, FaTimes } from "react-icons/fa";
import CustomInputField from "../utils/ui/commons/CustomInputField";

const sellerApiService = new SellerApiService();



const SellPropertyPage = ({ update }) => {
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
  const [updateImage, setUpdateImage] = useState([]);
  const [updateDocument, setUpdateDocument] = useState([]);
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

  useEffect(() => {
    setFormData({
      id: update.id,
      firstName: update.fristName,
      lastName: update.lastName,
      email: update.email,
      phone: update.phone,
      address: update.address,
      city: update.city,
      price: update?.price,
      description: update.description,
      images: [],
      documents: [],
    });
    setUpdateImage(update.propertyImages || []);
    setUpdateDocument(update.propertyDocuments || []);
  }, [update]);


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
      let response
      if (update) {
        response = await sellerApiService.updateSellerProperty(fileData);
      } else {
        response = await sellerApiService.createsellerproperty(fileData);
      };
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
    });
    setPreviewImages([]);
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

            {/* Basic CustomInputFields */}
            <div className="grid md:grid-cols-2 gap-6">
              <CustomInputField name="firstName" label="First Name" value={formData.firstName} onBlur={() => handleBlur('firstName')} onChange={handleChange} />
              <CustomInputField name="lastName" label="Last Name" value={formData.lastName} onBlur={() => handleBlur('lastName')} onChange={handleChange} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <CustomInputField name="email" type="email" label="Email Address" value={formData.email} onBlur={() => handleBlur('email')} onChange={handleChange} />
              <CustomInputField name="phone" label="Phone Number" value={formData.phone} onBlur={() => handleBlur('phone')} onChange={handleChange} />
            </div>

            <CustomInputField name="address" label="Property Address" value={formData.address} onBlur={() => handleBlur('address')} onChange={handleChange} />

            <div className="grid md:grid-cols-2 gap-6">
              <CustomInputField name="city" label="City" value={formData.city} onBlur={() => handleBlur('city')} onChange={handleChange} />
              <CustomInputField name="price" type="number" label="Property Price ($)" value={formData.price} onBlur={() => handleBlur('price')} onChange={handleChange} />
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

            {updateImage.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Existing Images:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {updateImage.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img.path}
                        alt={`existing-${index}`}
                        className="h-28 w-full object-cover rounded-lg border"
                      />
                    </div>
                  ))}
                </div>
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

            {updateDocument.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Existing Documents:</h3>
                <div className="space-y-3">
                  {updateDocument.map((doc, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
                    >
                      <a href={doc.path} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        {doc.filename}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              {update ? "Update Property" : "Submit Property"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


export default SellPropertyPage;