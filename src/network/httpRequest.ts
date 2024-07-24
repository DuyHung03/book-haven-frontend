import axios from 'axios';
import Cookies from 'universal-cookie';
import useUserStore from '../store/useUserStore';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

const cookies = new Cookies();

const handleAuthorError = () => {
    const { clearUser } = useUserStore.getState();
    clearUser();
    window.location.href = '/login';
};

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = cookies.get('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            handleAuthorError();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
