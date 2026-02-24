"use client";
import React from "react";
import { FaHandshake, FaDollarSign, FaFileContract, FaHome } from "react-icons/fa";

function WhyChooseUsCards() {
  const cards = [
    {
      icon: <FaDollarSign size={36} className="text-blue-500" />,
      title: "Best Market Prices",
      description:
        "We offer competitive pricing backed by real-time market analytics to maximize your property’s value.",
    },
    {
      icon: <FaHandshake size={36} className="text-blue-500" />,
      title: "Trusted Agents",
      description:
        "Our experienced agents guide you through every step, ensuring a smooth and transparent transaction.",
    },
    {
      icon: <FaFileContract size={36} className="text-blue-500" />,
      title: "Hassle-Free Documentation",
      description:
        "We manage all the paperwork and legalities so you don’t have to worry about complex processes.",
    },
    {
      icon: <FaHome size={36} className="text-blue-500" />,
      title: "Buy or Rent Anywhere",
      description:
        "Access a wide range of properties across locations, and complete your purchase or rental from the comfort of your home.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 max-w-xl mx-auto text-center">
        Why Choose Us for Your Property Needs?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map(({ icon, title, description }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 flex flex-col items-center text-center cursor-pointer
                       hover:shadow-2xl hover:scale-105 hover:border-blue-400 hover:bg-blue-50"
          >
            <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 text-sm md:text-base">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default WhyChooseUsCards;
