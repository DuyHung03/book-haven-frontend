import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setTokenInCookie = (token: string) => {
    cookies.set('accessToken', token, { path: '/', maxAge: 300, httpOnly: true, secure: true }); // 5 mins
};

export const clearTokenInCookie = () => {
    cookies.remove('accessToken');
};
