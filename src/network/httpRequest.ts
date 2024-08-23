import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import useUserStore from '../store/useUserStore';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Ensure cookies are sent with requests
});

const handleAuthorizationError = () => {
    const { clearUser } = useUserStore.getState();
    const { logout } = useAuthStore.getState();
    clearUser();
    logout();
};

const refreshAccessToken = async () => {
    try {
        await axios.post(
            'http://localhost:8080/api/v1/auth/refreshToken',
            {},
            {
                withCredentials: true,
            }
        );
    } catch (error) {
        console.log('Session expiry');
        handleAuthorizationError();
        throw error;
    }
};

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403) &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                await refreshAccessToken();
                // Retry the request without modifying headers (cookies will be sent automatically)
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
