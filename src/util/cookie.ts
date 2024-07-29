import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setTokenInCookie = (token: string) => {
    cookies.set('accessToken', token, { path: '/', maxAge: 60480000 }); // 5 mins
};

export const clearTokenInCookie = () => {
    cookies.remove('accessToken', { path: '/' });
};
