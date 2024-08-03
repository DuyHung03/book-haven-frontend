import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
}

export const tokenVerify = (token: string | null): boolean => {
    if (!token) return false;
    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};
