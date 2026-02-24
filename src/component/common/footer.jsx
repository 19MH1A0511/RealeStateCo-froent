"use client";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaHome } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="footer-section"   // 👈 IMPORTANT (for scrolling)
      className="bg-gray-900 text-white pt-12 pb-6 mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaHome className="text-blue-400 text-xl" />
            <h2 className="text-xl font-semibold">RealEstateCo</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Your trusted partner in buying, selling and renting properties.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About Us</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Our Story</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Policies</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <FaPhoneAlt className="text-blue-400" />
            <span>+91 99630 31889</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <FaEnvelope className="text-blue-400" />
            <span>info@realestateco.com</span>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-500 text-xs mt-10">
        © 2026 RealEstateCo. All rights reserved.
      </div>
    </footer>
  );
}
