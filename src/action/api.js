import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('seller'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;
