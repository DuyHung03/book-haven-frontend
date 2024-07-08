import {
    Button,
    Flex,
    Grid,
    GridCol,
    Group,
    Image,
    RadioCard,
    RadioGroup,
    RadioIndicator,
    ScrollArea,
    Stack,
    Text,
} from '@mantine/core';
import {
    AddHomeWork,
    CollectionsBookmark,
    Edit,
    LocalAtm,
    LocationOn,
    Payments,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import CheckoutHeader from '../component/CheckoutHeader';
import OrderItem from '../component/OrderItem';
import { AddressEntity } from '../entity/AddressEntity';
import { CartItemEntity } from '../entity/CartItemEntity';
import axiosInstance from '../network/httpRequest';
import shippingService from '../network/shippingServiceApi';
import useCurrentOrderStore from '../store/useCurrentOrder';
import useUserStore from '../store/useUserStore';
import { formatNumberWithDots } from '../util/formatPrice';

const Checkout = () => {
    const { user, token } = useUserStore();
    const { setCurrentOrderItems, setTotalAmount, clearCurrentOrder } = useCurrentOrderStore();
    // const navigate = useNavigate();
    const [address, setAddress] = useState<AddressEntity | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [shippingFee, setShippingFee] = useState<number>(0);
    const location = useLocation();

    const orderItems: CartItemEntity[] = location.state;

    console.log(orderItems);

    const getAddress = async () => {
        try {
            const res = await axiosInstance.get('/address/get', {
                params: {
                    userId: user.userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            calculateShippingFee(res.data.result);
            setAddress(res.data.result);
        } catch (error) {
            console.error(error);
        }
    };

    const calculateShippingFee = async (address: AddressEntity) => {
        try {
            const res = await shippingService.get('v2/shipping-order/fee', {
                params: {
                    from_district_id: 1503,
                    from_ward_code: '40503',
                    service_id: 53321,
                    service_type_id: null,
                    to_district_id: address.districtId,
                    to_ward_code: address.wardCode.toString(),
                    height: 20,
                    length: 20,
                    weight: 200,
                    width: 20,
                    insurance_value: 10000,
                    cod_failed_amount: 2000,
                    coupon: null,
                },
            });
            setShippingFee(res.data.data.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAddress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const paymentMethods = [
        {
            name: 'Pay via VNPAY',
            icon: (
                <Image
                    h={9}
                    src={'https://bizweb.dktcdn.net/assets/themes_support/vnpayqr-icon.png'}
                    alt=''
                />
            ),
        },
        {
            name: 'COD (Cash on Delivery)',
            icon: <LocalAtm color='primary' />,
        },
    ];

    const payments = paymentMethods.map((item) => (
        <RadioCard radius='md' value={item.name} key={item.name}>
            <Group wrap='nowrap' align='center' p={12} justify='flex-start'>
                <RadioIndicator />
                <Flex justify={'space-between'} w={'100%'} align={'center'}>
                    <Text c={'gray'} fw={500}>
                        {item.name}
                    </Text>
                    {item.icon}
                </Flex>
            </Group>
        </RadioCard>
    ));

    const bookPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total: number = bookPrice + shippingFee;

    const callPaymentApi = async () => {
        const res = await axiosInstance.get('/payment/vn-pay', {
            params: {
                amount: total,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    };

    const handleCheckout = async () => {
        if (address?.addressId && paymentMethod) {
            if (paymentMethod == 'Pay via VNPAY') {
                const res = await callPaymentApi();
                clearCurrentOrder();
                setCurrentOrderItems(orderItems);
                setTotalAmount(total);
                console.log(total);

                if (res.data.code === 200) {
                    window.location.href = res.data.result.paymentUrl;
                }
            } else {
                console.log('order COD success');
            }
        } else if (!address?.addressId) {
            toast.error('Missing delivery address', {
                autoClose: 1000,
            });
        } else {
            toast.error('Please choose payment method', {
                autoClose: 1000,
            });
        }
    };

    return (
        <Group>
            <CheckoutHeader />
            <ToastContainer
                toastStyle={{
                    marginTop: '80px',
                }}
                limit={1}
            />
            <Group mr={176} ml={176} w={'100%'} pb={30}>
                <Grid grow w={'100%'}>
                    <GridCol span={4}>
                        <Group mb={8}>
                            <LocationOn color='error' fontSize='medium' />
                            <Text fw={500} size='lg' c={'gray'}>
                                Delivery address:
                            </Text>
                        </Group>
                        {address?.addressId ? (
                            <div>
                                <Text ml={12} mb={4}>
                                    <b>Name: </b>
                                    {address?.fullName}
                                </Text>
                                <Text ml={12} mb={4}>
                                    <b>Phone: </b>
                                    {address?.phone}
                                </Text>
                                <Text ml={12} mb={4}>
                                    <b>Address: </b>
                                    {`${address?.houseNumber}, ${address?.wardName}, ${address?.districtName}, ${address?.provinceName}`}
                                </Text>
                                <Link to={`/checkout/${user.userId}/address`} state={address}>
                                    <Button
                                        leftSection={<Edit fontSize='small' />}
                                        variant='transparent'
                                        mt={8}
                                    >
                                        Edit address
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Text c={'gray'} fs={'italic'}>
                                    Please add your delivery address
                                </Text>
                                <Link to={`/checkout/${user.userId}/address`} state={address}>
                                    <Button
                                        color='cyan'
                                        mt={'sm'}
                                        leftSection={<AddHomeWork />}
                                        size='lg'
                                    >
                                        Add new address
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </GridCol>
                    <GridCol span={4}>
                        <Group mb={8}>
                            <CollectionsBookmark color='error' fontSize='medium' />
                            <Text fw={500} size='lg' c={'gray'}>
                                Order:
                            </Text>

                            <Group
                                style={{ border: '1px solid #0097B2', borderRadius: '12px' }}
                                w={'100%'}
                                p={24}
                            >
                                <ScrollArea
                                    h={200}
                                    pr={16}
                                    mih={100}
                                    scrollbarSize={4}
                                    scrollHideDelay={500}
                                    w={'100%'}
                                >
                                    {orderItems.map((item, index) => (
                                        <OrderItem cartItem={item} key={index} />
                                    ))}
                                </ScrollArea>
                                <hr style={{ width: '100%', borderTop: '0.1px solid #ccc' }} />

                                <Group justify='space-between' w={'100%'}>
                                    <Text fw={500} c={'gray'}>
                                        Estimated: ({orderItems.length})
                                    </Text>
                                    <Text fs={'italic'}>{`${formatNumberWithDots(
                                        bookPrice.toString()
                                    )} VND`}</Text>
                                </Group>
                                <Group justify='space-between' w={'100%'}>
                                    <Text fw={500} c={'gray'}>
                                        Shipping cost:
                                    </Text>
                                    <Text fs={'italic'}>{`${formatNumberWithDots(
                                        shippingFee.toString()
                                    )} VND`}</Text>
                                </Group>
                                <hr style={{ width: '100%', borderTop: '0.1px solid #ccc' }} />
                                <Group justify='space-between' w={'100%'}>
                                    <Text fw={500} size='lg' c={'dark'} fs={'italic'}>
                                        Total:
                                    </Text>
                                    <Text fw={700} size='xl' c={'cyan'}>{`${formatNumberWithDots(
                                        total.toString()
                                    )} VND`}</Text>
                                </Group>
                            </Group>
                        </Group>
                    </GridCol>
                    <GridCol span={4}>
                        <Group mb={8}>
                            <Payments color='error' fontSize='medium' />
                            <Text fw={500} size='lg' c={'gray'}>
                                Payment methods:
                            </Text>
                        </Group>
                        <Group w={'100%'} justify='center' align='center'>
                            <RadioGroup
                                ml={24}
                                mr={24}
                                w={'100%'}
                                value={paymentMethod}
                                onChange={setPaymentMethod}
                                description='Choose a payment method'
                            >
                                <Stack pt='md' gap='xs'>
                                    {payments}
                                </Stack>
                            </RadioGroup>
                            <Button
                                ml={24}
                                mr={24}
                                size='lg'
                                color='cyan'
                                w={'100%'}
                                onClick={handleCheckout}
                            >
                                Order
                            </Button>
                        </Group>
                    </GridCol>
                </Grid>
            </Group>
        </Group>
    );
};

export default Checkout;
