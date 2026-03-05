"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import LoginApiService from "@/services/login.api.service";
import { toast, ToastContainer } from "react-toastify";
import Loader from "@/component/utils/ui/commons/Loading";

const loginService = new LoginApiService();

function LoginModal({ onClose, onLogin }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    verificationCode: "",
  });

  const isPhone = /^\d+$/.test(formData.emailOrPhone);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (formData.name && formData.emailOrPhone) {
        setLoading(true);
        const response = await loginService.registerUser({
          name: formData.name,
          email: formData.emailOrPhone,
        });
        console.log("Login response:", response);
        setStep(2);
      };
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    try {
      e.preventDefault();
      if (formData.verificationCode) {
        const response = await loginService.verifyOTP({
          email: formData.emailOrPhone,
          otp: formData.verificationCode
        });

        //  await onLogin(response.data.response);

        if (response.success) {
          toast.success(response.message);
          // onLogin(response.data.response);
          onLogin(response.data.response);
          onClose();
        }
      } else {
        toast.error("please enter the verification code");
        return;
      }

    } catch (error) {
      console.error("Error during login:", error);
    };
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4 z-50">
      <div className="w-full max-w-md">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative">

            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
              Login
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="text"
                name="emailOrPhone"
                placeholder="Enter Email or Phone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              {isPhone && formData.emailOrPhone.length > 0 && (
                <p className="text-sm text-purple-600">
                  Enter the phone number which have a WhatsApp
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition duration-300 h-12 flex items-center justify-center"
              >
                {loading ? <Loader /> : "Login"}
              </button>

            </form>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 relative">

            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
              Welcome {formData.name} 👋
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Verification code has been sent to{" "}
              <span className="font-semibold text-gray-900">
                {formData.emailOrPhone}
              </span>
            </p>

            <form onSubmit={handleVerify} className="space-y-5">

              <input
                type="text"
                name="verificationCode"
                placeholder="Enter Verification Code"
                value={formData.verificationCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition duration-300"
              >
                
                Verify
              </button>

            </form>
          </div>
        )}

      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginModal;