import axios from 'axios';

const shippingService = axios.create({
    baseURL: 'https://dev-online-gateway.ghn.vn/shiip/public-api/',
    headers: {
        'Content-Type': 'application/json',
        token: '63debb08-f560-11ee-a6e6-e60958111f48',
        shopId: '191719',
    },
});

export default shippingService;
