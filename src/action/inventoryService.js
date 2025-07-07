import axios from "axios";
import conf from "../conf/conf";

const API_URL = `${conf.apiBaseUrl}/products`;

const inventoryService = {
    // Fetch inventory for the logged-in seller by passing sellerId
    getInventory: async (sellerId) => {
        try {
            const response = await axios.get(`${API_URL}/seller`, {
                params: { sellerId },
            });
            console.log(response);
            // Convert seller field if it's an object with a $oid property
            const products = response.data.map((product) => {
                if (product.seller && typeof product.seller === "object" && product.seller.$oid) {
                    product.seller = product.seller.$oid;
                }
                return product;
            });
            return products;
        } catch (error) {
            throw error.response?.data || "Failed to fetch inventory";
        }
    },
    
    // Update product details (e.g., Categories, Stock, Price)
    updateProduct: async (id, updatedFields, sellerId) => {
        try {
            const response = await axios.patch(`${API_URL}/${id}`, updatedFields, {
                params: { sellerId },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to update product";
        }
    },
    
    // Delete a product
    deleteProduct: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Failed to delete product";
        }
    },
};

export default inventoryService;
