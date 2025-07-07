import axios from './api';
import conf from '../conf/conf';

const API_URL = `${conf.apiBaseUrl}/orders`;

const orderService = {

    fetchOrders: async () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;
        const sellerId = storedUser?.sellerId;
        if (!token || !sellerId) {
            throw "Missing authentication or seller ID.";
        }
        const response = await axios.get(`${API_URL}/seller/${sellerId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },

    updateOrderStatus: async ({ orderId, newStatus }) => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;
        if (!token) {
            throw "Unauthorized: No token found.";
        }
        const response = await axios.patch(`${API_URL}/${orderId}`, newStatus, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain",
            },
        });
        return response.data;
    },

};

export default orderService;
