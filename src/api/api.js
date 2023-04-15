import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://bookmyshow-backend-nti9.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {
    if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
}, (error) => Promise.reject(error)
);