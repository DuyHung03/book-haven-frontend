import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Group } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import axiosInstance from '../network/httpRequest';
import shippingService from '../network/shippingServiceApi';
import useCurrentOrderStore from '../store/useCurrentOrder';
import useUserStore from '../store/useUserStore';

const PaymentResult = () => {
    const { user } = useUserStore();
    const { orderItems, totalAmount, isSaved, setIsSaved } = useCurrentOrderStore();
    const location = useLocation();
    const { paymentMethod } = location.state || {};
    const [checkoutStatus, setCheckoutStatus] = useState(false);
    const [searchParams] = useSearchParams();
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');
    const vnp_PayDate = searchParams.get('vnp_PayDate');
    const paymentTypeId = useMemo(
        () => (paymentMethod === 'COD (Cash on Delivery)' ? 2 : 1),
        [paymentMethod]
    );
    const codAmount = useMemo(
        () => (paymentMethod === 'COD (Cash on Delivery)' ? totalAmount : 0),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [paymentMethod]
    );

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
            withCredentials: true,
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
                withCredentials: true,
            }
        );
        if (res.data.code == 200) setCheckoutStatus(true);
        console.log(totalAmount);
    };

    const data = {
        to_name: user.email,
        from_name: 'Book Haven Store',
        from_phone: '0904123456',
        from_address: 'Phường Hòa Khánh Bắc, Quận Liên Chiểu, Da Nang, Vietnam',
        from_ward_name: 'Phường Hòa Khánh Bắc',
        from_district_name: 'Quận Liên Chiểu',
        from_province_name: 'Đà Nẵng',
        to_phone: user.address?.phone,
        to_address: `${user.address?.houseNumber}, ${user.address?.wardName}, ${user.address?.districtName}, ${user.address?.provinceName}`,
        to_ward_code: user.address?.wardCode.toString(),
        to_district_id: user.address?.districtId,
        weight: 20,
        height: 20,
        length: 20,
        width: 20,
        service_type_id: 5,
        service_id: 53321,
        payment_type_id: paymentTypeId,
        required_note: 'KHONGCHOXEMHANG',
        note: 'Call before delivery please',
        cod_amount: codAmount,
        items: orderItems.map((order) => ({
            name: order.title,
            quantity: order.quantity,
            weight: 1,
        })),
    };

    const createOrderOnShippingService = async () => {
        const res = await shippingService.post('v2/shipping-order/create', data, {
            withCredentials: true,
        });
        if (res.data.code == 200) {
            saveOrder();
        }
        console.log(res);
    };

    useEffect(() => {
        if (vnp_ResponseCode == '00') {
            if (!isSaved) {
                savePayment(); //save online payment
                createOrderOnShippingService(); //create order on ghn
                setIsSaved(true); //set is save to avoid re-save
            }
            console.log('vnp');
        }

        if (paymentMethod == 'COD (Cash on Delivery)') {
            if (!isSaved) {
                saveOrder();
                setIsSaved(true);
                createOrderOnShippingService();
                console.log('cod');
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(checkoutStatus);

    return (
        <Group w={150} h={150} justify='center' align='center'>
            {!checkoutStatus ? (
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
