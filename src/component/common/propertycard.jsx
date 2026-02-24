"use client";
import React, { useState } from "react";
import { FaHome, FaShoppingCart, FaKey } from "react-icons/fa";
import SellFormCard from "./SellFormCard";

export default function PropertyCard() {
  const [showSellForm, setShowSellForm] = useState(false);

  return (
    <div
      id="property-card" // Added ID for smooth scrolling
      className="flex justify-center mt-20 mb-20 px-4 relative"
    >
      <div className="bg-gradient-to-r from-gray-100 to-white rounded-3xl shadow-xl p-8 w-full max-w-5xl flex flex-col md:flex-row justify-between gap-12">

        {/* Sell Card */}
        <button
          onClick={() => setShowSellForm(true)}
          className="flex flex-col items-center justify-center cursor-pointer rounded-2xl p-8 transition transform duration-300 shadow-md hover:shadow-2xl hover:scale-105"
        >
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-8 mb-5 shadow-lg flex items-center justify-center">
            <FaShoppingCart size={32} className="text-white" />
          </div>
          <span className="text-2xl font-semibold text-gray-800 hover:text-gray-900 transition">
            Sell
          </span>
        </button>

        {/* Buy Card */}
        <button className="flex flex-col items-center justify-center cursor-pointer rounded-2xl p-8 transition transform duration-300 shadow-md hover:shadow-2xl hover:scale-105">
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-full p-8 mb-5 shadow-lg flex items-center justify-center">
            <FaHome size={32} className="text-white" />
          </div>
          <span className="text-2xl font-semibold text-gray-800 hover:text-gray-900 transition">
            Buy
          </span>
        </button>

        {/* Rent Card */}
        <button className="flex flex-col items-center justify-center cursor-pointer rounded-2xl p-8 transition transform duration-300 shadow-md hover:shadow-2xl hover:scale-105">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-full p-8 mb-5 shadow-lg flex items-center justify-center">
            <FaKey size={32} className="text-white" />
          </div>
          <span className="text-2xl font-semibold text-gray-800 hover:text-gray-900 transition">
            Rent
          </span>
        </button>
      </div>

      {/* Sell Form Modal */}
      {showSellForm && <SellFormCard onClose={() => setShowSellForm(false)} />}
    </div>
  );
}
