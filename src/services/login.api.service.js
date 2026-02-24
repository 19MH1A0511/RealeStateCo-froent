"use client";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

class LoginApiService {

    async registerUser(userData) {
        try {
            const response = await axios.post(`${API_BASE_URL}project/api/v1/v.1.0.0/login/verification`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.data) {
                throw new Error("Invalid response from server");
            };
            return response.data;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        };
    };

    async verifyOTP(otpData) {
        try {
            const response = await axios.post(`${API_BASE_URL}project/api/v1/v.1.0.0/login/login`, otpData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            if (!response.data) {
                throw new Error("Invalid response from server");
            }
            if (response.data) {
                localStorage.setItem('token', response.data.data.token || '');
                localStorage.setItem('id', response.data.data.response?.id || '');
                localStorage.setItem('email', response.data.data.response?.email || '');
                localStorage.setItem('name', response.data.data.response?.name || '');
            };
            return response.data;
        } catch (error) {
            console.error("Error verifying OTP:", error);
            throw error;
        };
    };
};

export default LoginApiService;