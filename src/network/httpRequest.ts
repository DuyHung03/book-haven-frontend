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
    window.location.href = '/login';
};

const refreshAccessToken = async () => {
    try {
        const response = await axios.post(
            'http://localhost:8080/api/v1/auth/refresh-token',
            {},
            {
                withCredentials: true, // Ensure cookies are included
            }
        );

        // The new access token should automatically be set in an HttpOnly cookie
        console.log('Access token refreshed:', response.data);
        return response.data.accessToken; // Not used directly, since it's in a cookie
    } catch (error) {
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
            (error.response.status === 401 ||
                error.response.status === 403 ||
                error.response.status === 400) &&
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
