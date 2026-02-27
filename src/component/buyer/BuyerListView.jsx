import React, { useState, useEffect } from "react";
import SellerApiService from "@/services/seller.api.service";

const sellerService = new SellerApiService();

function BuyerListView() {
  const [sellerList, setSellerList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerListData = async () => {
    try {
      const response = await sellerService.fetchSellerList();
      setSellerList(response.data);
    } catch (error) {
      console.error("Error fetching seller list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerListData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-xl font-semibold">Loading properties...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Properties
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sellerList.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={
                  property.propertyImages?.length > 0
                    ? property.propertyImages[0].path
                    : "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt="property"
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {property.fristName} {property.lastName}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                {property.propertyType}
              </p>

              <p className="text-sm text-gray-600 line-clamp-2">
                {property.description}
              </p>

              <div className="mt-3 text-sm text-gray-700">
                <p><span className="font-medium">City:</span> {property.city}</p>
                <p className="truncate">
                  <span className="font-medium">Address:</span>{" "}
                  {property.address}
                </p>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerListView;
