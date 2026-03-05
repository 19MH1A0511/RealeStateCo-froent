"use client";
import React, { useState } from "react";
import { FaHome, FaShoppingCart, FaKey, FaIcons, FaBuilding, FaCouch, FaClipboardCheck  } from "react-icons/fa";
import SellFormCard from "./SellFormCard";
import ServiceFormCard from "./ServiceFormCard";

// Updated serviceDetails with more types in description
const serviceDetails = {
  Interior: {
    title: "Interior Design & Decoration",
    description: `We provide interior design, decoration, and space optimization services. 
From furniture placement, color palettes, lighting, to decor accents, we make your space stylish and functional.
Common interior types we specialize in:
- Modern: Clean lines, minimalism, neutral colors, functional spaces.
- Contemporary: Sleek furniture, current trends, bold accent pieces.
- Scandinavian: Bright airy spaces, light woods, cozy elements.
- Industrial: Raw materials like brick, metal, and wood, open layouts.
- Bohemian (Boho): Eclectic, artistic, colorful, relaxed vibe.`,
    icon: <FaIcons size={40} className="text-white" />,
    gradient: "from-purple-500 to-pink-500",
  },
  Construction: {
    title: "Construction & Renovation",
    description: `We handle building, renovation, and remodeling of residential and commercial spaces. 
Quality workmanship, timely delivery, and safety compliance are our top priorities.
Types of construction services:
- Residential: Houses, apartments, villas.
- Commercial: Offices, shops, restaurants.
- Renovation & Remodeling: Upgrade existing spaces.
- Structural Planning: Safe and modern building designs.`,
    icon: <FaBuilding size={40} className="text-white" />,
    gradient: "from-green-400 to-green-600",
  },
  Inspection: {
    title: "Property Inspection & Assessment",
    description: `Our experts check properties for structural integrity, safety, and compliance. 
You will receive detailed reports and recommendations before making decisions.
Inspection types include:
- Pre-purchase Inspection: Check property condition before buying.
- Safety Inspection: Electrical, plumbing, and structural checks.
- Maintenance Inspection: Identify repairs and improvements.
- Compliance Check: Ensure building follows local regulations.`,
    icon: <FaHome size={40} className="text-white" />,
    gradient: "from-blue-400 to-blue-600",
  },
};

export default function PropertyCard() {
  const [showSellForm, setShowSellForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [serviceType, setServiceType] = useState("");

  // Open info modal first
  const openServiceInfo = (type) => {
    setServiceType(type);
    setShowInfoModal(true);
  };

  const handleNextFromInfo = () => {
    setShowInfoModal(false);
    setShowServiceForm(true);
  };

  const handleCloseInfo = () => {
    setShowInfoModal(false);
  };

  const service = serviceDetails[serviceType];

  return (
    <div
      id="property-card"
      className="flex justify-center mt-10 sm:mt-14 mb:mt-20 mb-10 sm:mb-16 md:mb-20 px-4 relative"
    >
      <div className="bg-gradient-to-r from-gray-100 to-white rounded-3xl shadow-xl p-6 w-full max-w-7xl flex justify-between items-center flex-nowrap">

        {/* Sell Card */}
        <button
          onClick={() => setShowSellForm(true)}
          className="flex flex-col items-center justify-center cursor-pointer rounded-2xl p-5 sm:p-6 md:p-8 transition transform duration-300 shadow-md hover:shadow-2xl hover:scale-105"
        >
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-8 mb-5 shadow-lg flex items-center justify-center">
            <FaShoppingCart size={40} className="text-white" />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 hover:text-gray-900 transition">
            Sell
          </span>
        </button>

        {/* Buy Card */}
        <button className="flex flex-col items-center justify-center cursor-pointer rounded-2xl p-5 sm:p-6 md:p-8 transition transform duration-300 shadow-md hover:shadow-2xl hover:scale-105">
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-full p-8 mb-5 shadow-lg flex items-center justify-center">
            <FaHome size={40} className="text-white" />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 hover:text-gray-900 transition">
            Buy
          </span>
        </button>

        {/* Rent Card */}
        <button className="flex flex-col items-center justify-center cursor-pointer rounded-2xl p-5 sm:p-6 md:p-8 transition transform duration-300 shadow-md hover:shadow-2xl hover:scale-105">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-full p-8 mb-5 shadow-lg flex items-center justify-center">
            <FaKey size={40} className="text-white" />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 hover:text-gray-900 transition">
            Rent
          </span>
        </button>

        {/* Interiors */}
        <button
          onClick={() => openServiceInfo("Interior")}
          className="flex flex-col items-center justify-center cursor-pointer rounded-2xl p-5 sm:p-6 md:p-8 transition transform duration-300 shadow-md hover:shadow-2xl hover:scale-105"
        >
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-8 mb-5 shadow-lg flex items-center justify-center">
            <FaCouch size={40} className="text-white" />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 hover:text-gray-900 transition">
            Interiors
          </span>
        </button>

        {/* Construction */}
        <button
          onClick={() => openServiceInfo("Construction")}
          className="flex flex-col items-center justify-center cursor-pointer rounded-2xl p-5 sm:p-6 md:p-8 transition transform duration-300 shadow-md hover:shadow-2xl hover:scale-105"
        >
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full p-8 mb-5 shadow-lg flex items-center justify-center">
            <FaBuilding size={40} className="text-white" />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 hover:text-gray-900 transition">
            Construction
          </span>
        </button>

        {/* Inspection */}
        <button
          onClick={() => openServiceInfo("Inspection")}
          className="flex flex-col items-center justify-center cursor-pointer rounded-2xl p-5 sm:p-6 md:p-8 transition transform duration-300 shadow-md hover:shadow-2xl hover:scale-105"
        >
          <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full p-8 mb-5 shadow-lg flex items-center justify-center">
            <FaClipboardCheck  size={40} className="text-white" />
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 hover:text-gray-900 transition">
            Inspection
          </span>
        </button>
      </div>

      {/* Sell Form Modal */}
      {showSellForm && <SellFormCard onClose={() => setShowSellForm(false)} />}

      {/* Service Info Modal */}
      {showInfoModal && service && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
    <div className="relative w-full max-w-md sm:max-w-lg bg-white/90 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[80vh] overflow-y-auto text-center">
      
      {/* Close */}
      <button
        onClick={handleCloseInfo}
        className="absolute top-4 right-5 text-gray-500 hover:text-red-500 text-xl transition"
      >
        ✕
      </button>

      {/* Icon */}
      <div className={`w-20 h-20 mx-auto rounded-full mb-4 flex items-center justify-center bg-gradient-to-r ${service.gradient} shadow-lg`}>
        {service.icon}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h2>

      {/* Intro description */}
      <p className="text-gray-700 mb-2 leading-relaxed">{service.description.split('\n')[0]}</p>

      {/* Bullet points */}
      <ul className="list-disc list-inside text-left text-gray-700 mb-6 space-y-1">
        {service.description
          .split('\n')
          .slice(1) // Skip first line
          .map((item, idx) => (
            <li key={idx}>{item.replace(/^- /, '')}</li>
          ))}
      </ul>

      {/* Next Button */}
      <button
        onClick={() => {
          setShowInfoModal(false);
          setShowServiceForm(true);
        }}
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Next
      </button>
    </div>
  </div>
)}

      {/* Service Form Modal */}
      {showServiceForm && (
        <ServiceFormCard
          type={serviceType}
          onClose={() => setShowServiceForm(false)}
        />
      )}
    </div>
  );
}