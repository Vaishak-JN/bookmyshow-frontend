import axios from 'axios';
import { useSelector } from 'react-redux';

export const axiosInstance = axios.create({
    baseURL: 'https://bookmyshow-backend-nti9.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});

// Add a request interceptor
// axiosInstance.interceptors.request.use(config => {
//     const token = useSelector(state => state.users.token)
//     if (!config.headers['Authorization']) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => Promise.reject(error)
// );