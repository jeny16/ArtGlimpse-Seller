import axios from "axios";

const API_URL = "http://localhost:8081/products";

const inventoryService = {
    getInventory: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to fetch inventory";
        }
    },
};

export default inventoryService;