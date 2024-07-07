import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../network/httpRequest';
import useUserStore from '../store/useUserStore';

const PaymentResult = () => {
    const { token } = useUserStore();
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

    useEffect(() => {
        if (vnp_ResponseCode == '00') {
            savePayment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <a href='/'>{vnp_ResponseCode == '00' ? 'Successed' : 'Failed'}</a>;
};

export default PaymentResult;
