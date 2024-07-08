import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Group } from '@mantine/core';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../network/httpRequest';
import useCurrentOrderStore from '../store/useCurrentOrder';
import useUserStore from '../store/useUserStore';

const PaymentResult = () => {
    const { token, user } = useUserStore();
    const { orderItems, totalAmount, isSaved, setIsSaved } = useCurrentOrderStore();
    const [searchParams] = useSearchParams();
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');
    const vnp_PayDate = searchParams.get('vnp_PayDate');

    const savePayment = async () => {
        await axiosInstance.get('/payment/vn-pay-callback', {
            params: {
                vnp_Amount: vnp_Amount,
                vnp_BankCode: vnp_BankCode,
                vnp_OrderInfo: vnp_OrderInfo,
                vnp_PayDate: vnp_PayDate,
                vnp_ResponseCode: vnp_ResponseCode,
                vnp_TransactionNo: vnp_TransactionNo,
                vnp_TxnRef: vnp_TxnRef,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };

    const saveOrder = async () => {
        const res = await axiosInstance.post(
            '/order/save',
            { totalAmount: totalAmount.toString(), orderItems: orderItems },
            {
                params: {
                    userId: user.userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(res);
    };

    useEffect(() => {
        if (vnp_ResponseCode == '00') {
            savePayment();
            if (!isSaved) {
                saveOrder();
                setIsSaved(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Group w={150} h={150} justify='center' align='center'>
            {vnp_ResponseCode == '00' ? (
                <DotLottieReact
                    src='https://lottie.host/3feb6297-7841-41d2-b588-d8bcb77f4514/wuIxQfHXDd.lottie'
                    autoplay
                />
            ) : (
                <DotLottieReact
                    src='https://lottie.host/11904617-7d7c-45d5-aba5-f3b1810fcd8c/PQrd5LxNPy.lottie'
                    autoplay
                />
            )}
            <a href={'/'}>Home</a>
        </Group>
    );
};

export default PaymentResult;
