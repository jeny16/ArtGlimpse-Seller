import axios from 'axios';
import conf from '../conf/conf';

const BASE_URL = `${conf.apiBaseUrl}/api/seller/store`;

const storeDetailsService = {
    // Fetch store details for a seller using their ID (passed as userId to backend)
    fetchStoreDetails: async (sellerId) => {
        const response = await axios.get(BASE_URL, { params: { userId: sellerId } });
        return response.data;
    },
    // Update store details for a seller using their ID
    updateStoreDetails: async (sellerId, storeDetails) => {
        const response = await axios.put(BASE_URL, storeDetails, { params: { userId: sellerId } });
        return response.data;
    },
    // Delete store details for a seller
    deleteStoreDetails: async (sellerId) => {
        const response = await axios.delete(BASE_URL, { params: { userId: sellerId } });
        return response.data;
    },
};

export default storeDetailsService;
