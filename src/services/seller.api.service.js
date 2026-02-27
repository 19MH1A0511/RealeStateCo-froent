"use client";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

class SellerApiService {

    async createsellerproperty(userData) {
        try {
            const response = await axios.post(`${API_BASE_URL}project/api/v1/v.1.0.0/seller/add`, userData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (!response.data) {
                throw new Error("Invalid response from server");
            };
            return response.data;
        } catch (error) {
            console.error("Error creating seller property:", error);
            throw error;
        };
    };

    async fetchSellerList() {
        try {
            const response = await axios.get(`${API_BASE_URL}project/api/v1/v.1.0.0/seller/list`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (!response.data) {
                throw new Error("Invalid response from server");
            };
            return response.data;
        } catch (error) {
            console.error("Error fetching seller list:", error);
            throw error;
        };
    };
};

export default SellerApiService;