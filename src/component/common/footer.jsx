"use client";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaHome } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      id="footer-section"
      className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white pt-14 sm:pt-16 md:pt-20 pb-8 mt-16 sm:mt-20 md:mt-24 overflow-hidden"
    >
      {/* Subtle Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Brand Section */}
        <div className="text-center mb-14">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-full backdrop-blur-sm">
              <FaHome className="text-blue-400 text-xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-wide">
              RealEstateCo
            </h2>
          </div>

          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Helping you buy, sell, and rent properties with confidence and
            transparency. Your trusted real estate partner.
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-center sm:text-left">

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              About
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-blue-500"></span>
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-blue-400 transition cursor-pointer">
                Our Story
              </li>
              <li className="hover:text-blue-400 transition cursor-pointer">
                Careers
              </li>
              <li className="hover:text-blue-400 transition cursor-pointer">
                Blog
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Policies
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-blue-500"></span>
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-blue-400 transition cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-blue-400 transition cursor-pointer">
                Terms & Conditions
              </li>
              <li className="hover:text-blue-400 transition cursor-pointer">
                Support
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Contact
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-blue-500"></span>
            </h3>

            <div className="space-y-4 text-gray-400 text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-3 hover:text-blue-400 transition">
                <FaPhoneAlt className="text-blue-400" />
                <span>+91 99630 31889</span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-3 hover:text-blue-400 transition">
                <FaEnvelope className="text-blue-400" />
                <span>info@realestateco.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Divider */}
        <div className="border-t border-gray-700 mt-12 sm:mt-14 md:mt-16 pt-6 text-center text-gray-500 text-xs sm:text-sm">
          © 2026 RealEstateCo. All rights reserved.
        </div>

      </div>
    </footer>
  );
}