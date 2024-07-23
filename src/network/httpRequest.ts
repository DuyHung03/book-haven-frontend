import axios from 'axios';
import Cookies from 'universal-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const cookies = new Cookies();

export const setAuthHeader = () => {
    const token = cookies.get('accessToken');
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

export default axiosInstance;
