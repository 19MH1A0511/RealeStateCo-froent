"use client";
import React, { useState, useEffect } from 'react';
import SellerApiService from "@/services/seller.api.service";
import SellerForm from "@/component/seller/SellerForm";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const sellerService = new SellerApiService();

const YourPropertierVeiw = ({ userId }) => {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleYourProtierList = async (userid) => {
    try {
      setLoading(true);
      const response = await sellerService.fetchSellerListByUserId(userid);
      setProperties(response.data);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    if (userId) {
      handleYourProtierList(userId);
    }
  }, [userId]);

  const handleUpdate = async (id) => {
    try {
      const response = await sellerService.fetchSellerDataById(id);
      setSelectedProperty(response.data);
    } catch (error) {
      console.log("error:", error);
    };
  };

  const handleDetails = (propertiesid) => {
   try {
     router.push(`/project/v1/seller/propertiesdetails/${propertiesid}`);
    } catch (error) {
      console.log("error:", error);
    };
  };

  if(selectedProperty){
    return <SellerForm update={selectedProperty} />;
  };

  if (loading) return <p>Loading...</p>;

  if (!properties.length) return <p>No Properties Found</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="border rounded-lg shadow-md p-4 bg-white"
          onClick={() => handleDetails(property.id)}
        >
          {/* Show First Image */}
          {property.propertyImages.length > 0 && (
            <img
              src={property.propertyImages[0].path}
              alt="property"
              className="w-full h-40 object-cover rounded-md mb-3"
            />
          )}
          <div className='flex justify-between'>
            <h2 className="text-lg font-bold">
              {property.fristName} {property.lastName}
            </h2>
            <button className="border px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={() => handleUpdate(property.id)}>update</button>
          </div>
          <p className="text-sm text-gray-600">
            {property.propertyType}
          </p>

          <p className="text-sm mt-2">
            {property.description}
          </p>

          <p className="text-sm mt-2 text-gray-500">
            📍 {property.address}, {property.city}
          </p>
        </div>
      ))}
    </div>
  );
};



export default YourPropertierVeiw;