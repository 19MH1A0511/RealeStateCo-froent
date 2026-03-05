"use client";
import React, { useEffect, useState } from "react";
import SellerApiService from "@/services/seller.api.service";

const sellerApiService = new SellerApiService();

const PropertierDetailsView = ({ propertiesid }) => {
    const [propertyDetails, setPropertyDetails] = useState(null);

    const fetchDetails = async (id) => {
        try {
            const response = await sellerApiService.fetchSellerDataById(id);
            setPropertyDetails(response.data);
        } catch (error) {
            console.log("error:", error);
        };
    };

    useEffect(() => {
        if (propertiesid) {
            fetchDetails(propertiesid);
        }
    }, [propertiesid]);

    if (!propertyDetails) {
        return <p>Loading...</p>;
    };

    return (
        <div className="p-5 border rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Property Details</h2>
            <p><b>Name:</b> {propertyDetails.fristName} {propertyDetails.lastName}</p>
            <p><b>Email:</b> {propertyDetails.email}</p>
            <p><b>Property Type:</b> {propertyDetails.propertyType}</p>
            <p><b>Description:</b> {propertyDetails.description}</p>
            <p><b>Address:</b> {propertyDetails.address}</p>
            <p><b>City:</b> {propertyDetails.city}</p>
            <h3 className="text-xl font-semibold mt-4">Property Images</h3>
            <div className="flex gap-4 mt-3 flex-wrap">
                {propertyDetails.propertyImages?.map((img) => (
                    <img
                        key={img.id}
                        src={img.path}
                        alt={img.fileName}
                        className="w-40 h-40 object-cover rounded"
                    />
                ))}
            </div>
        </div>
    );
};

export default PropertierDetailsView;