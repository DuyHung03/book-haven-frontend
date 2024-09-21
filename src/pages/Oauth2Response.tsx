import { Center, Loader } from '@mantine/core';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../network/httpRequest';

function Oauth2Response() {
    const [param] = useSearchParams();
    const status = param.get('status');
    const navigate = useNavigate();

    const handleSuccess = async () => {
        const res = await axiosInstance.post(
            '/auth/user-info',
            {},
            {
                withCredentials: true,
            }
        );
        console.log(res);
    };

    useEffect(() => {
        if (status == 'success') {
            handleSuccess();
        } else navigate('/login');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Center h={'100vh'}>
            <Loader size={'xl'} />
        </Center>
    );
}

export default Oauth2Response;
