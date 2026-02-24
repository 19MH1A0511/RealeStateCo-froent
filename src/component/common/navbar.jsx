"use client";
import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoLocation } from "react-icons/io5";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaHeart,
  FaBuilding,
  FaHome,
  FaChartLine,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "./LoginModal";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocOpen, setLocOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedLoc, setSelectedLoc] = useState("Hyderabad");
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  const locRef = useRef(null);
  const profileRef = useRef(null);

  const locations = ["Hyderabad", "Mumbai", "Bangalore", "Chennai", "Pune"];

  const menuData = {
    Buy: {
      types: [
        { name: "Apartments", link: "/buy/apartments", icon: <FaBuilding /> },
        { name: "Villas", link: "/buy/villas", icon: <FaHome /> },
        { name: "Plots", link: "/buy/plots", icon: <FaHome /> },
        { name: "Commercial", link: "/buy/commercial", icon: <FaBuilding /> },
      ],
      features: [
        { name: "Luxury Homes", link: "/buy/luxury", icon: <FaChartLine /> },
        { name: "New Projects", link: "/buy/new-projects", icon: <FaChartLine /> },
      ],
    },
    Rent: {
      types: [
        { name: "Flats", link: "/rent/flats", icon: <FaBuilding /> },
        { name: "Independent House", link: "/rent/house", icon: <FaHome /> },
        { name: "Office Space", link: "/rent/office", icon: <FaBuilding /> },
      ],
      features: [
        { name: "Furnished", link: "/rent/furnished", icon: <FaChartLine /> },
        { name: "Family Homes", link: "/rent/family", icon: <FaChartLine /> },
      ],
    },
    Sell: {
      types: [
        { name: "Post Property", link: "/sell/post", icon: <FaHome /> },
        { name: "Agent Listings", link: "/sell/agents", icon: <FaBuilding /> },
      ],
      features: [
        { name: "Free Valuation", link: "/sell/valuation", icon: <FaChartLine /> },
        { name: "Premium Listing", link: "/sell/premium", icon: <FaChartLine /> },
      ],
    },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locRef.current && !locRef.current.contains(event.target)) setLocOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setProfileOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white/70 backdrop-blur-lg shadow-lg fixed top-0 left-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={34} height={34} />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              RealEstateCo
            </h1>
          </div>

          {/* Desktop Menu */}
          {/* Desktop Menu */}
<div className="hidden md:flex items-center gap-10 font-medium relative">
  {Object.keys(menuData).map((menu) => (
    <div
      key={menu}
      className="relative"
      onMouseEnter={() => setActiveMenu(menu)}
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Button */}
      <button className="relative flex items-center gap-1 group py-2">
        {menu}
        <RiArrowDropDownLine size={20} />
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
      </button>

      {/* Dropdown */}
      {activeMenu === menu && (
        <div className="absolute left-0 top-full pt-4">
          
          {/* Invisible hover bridge */}
          <div className="absolute -top-4 left-0 w-full h-4"></div>

          <div className="w-[600px] bg-white shadow-2xl rounded-3xl p-8 grid grid-cols-2 gap-8 border transition-all duration-200">
            
            {/* Property Types */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                Property Types
              </h3>
              <div className="space-y-3">
                {menuData[menu].types.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition group"
                  >
                    <span className="text-blue-600 text-lg">
                      {item.icon}
                    </span>
                    <span className="group-hover:text-blue-600">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                Popular Searches
              </h3>
              <div className="space-y-3">
                {menuData[menu].features.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 transition group"
                  >
                    <span className="text-indigo-600 text-lg">
                      {item.icon}
                    </span>
                    <span className="group-hover:text-indigo-600">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  ))}
</div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-5">

            {/* Location */}
            <div ref={locRef} className="relative">
              <button
                onClick={() => setLocOpen(!isLocOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
              >
                <IoLocation className="text-blue-600" />
                <span className="text-sm font-medium">{selectedLoc}</span>
                <RiArrowDropDownLine size={20} />
              </button>

              {isLocOpen && (
                <div className="absolute top-12 left-0 bg-white shadow-xl rounded-2xl p-3 w-48 border">
                  {locations.map((loc, i) => (
                    <div
                      key={i}
                      onClick={() => { setSelectedLoc(loc); setLocOpen(false); }}
                      className="p-2 text-sm hover:bg-blue-50 rounded-lg cursor-pointer transition"
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <FaHeart className="text-gray-600 hover:text-red-500 cursor-pointer transition text-xl" />

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 hover:text-blue-600 transition"
              >
                <FaUserCircle size={24} />
                <RiArrowDropDownLine size={20} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white shadow-xl rounded-2xl p-2 border">
                  {!user ? (
                    <button
                      onClick={() => { setShowLogin(true); setProfileOpen(false); }}
                      className="block w-full text-left p-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Login
                    </button>
                  ) : (
                    <>
                      <p className="p-2 text-sm font-medium">{user.name}</p>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left p-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

        </div>
      </nav>

      <div className="h-16"></div>

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </>
  );
};

export default Navbar;