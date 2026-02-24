"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function HomePageSection() {
  const images = ["/realestateimg1.jpg", "/realestateimg2.jpg", "/realestateimg3.jpg"];
  const [changeImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  
  const scrollToPropertyCard = () => {
    const element = document.getElementById("property-card");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[90vh] md:h-screen overflow-hidden">
      
      <Image
        key={changeImage}
        src={images[changeImage]}
        alt="Luxury Home"
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-3 drop-shadow-lg">
          Find Your Dream Property
        </h1>
        <p className="text-white text-lg md:text-2xl mb-6 drop-shadow-md">
          Buy, Rent & Sell Properties Easily
        </p>
        <button
          onClick={scrollToPropertyCard}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}
