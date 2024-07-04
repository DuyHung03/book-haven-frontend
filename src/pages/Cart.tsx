import {
    Box,
    Button,
    Center,
    Checkbox,
    CloseButton,
    Flex,
    Group,
    Image,
    Table,
    Text,
} from '@mantine/core';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CartItem from '../component/CartItem';
import SubBanner from '../component/SubBanner';
import { CartItemEntity } from '../entity/CartItemEntity';
import axiosInstance from '../network/httpRequest';
import useUserStore from '../store/useUserStore';
import { formatNumberWithDots } from '../util/formatPrice';

const Cart = () => {
    const { user, token } = useUserStore();

    const [cartItems, setCartItems] = useState<CartItemEntity[]>([]);

    const [selectedItems, setSelectedItems] = useState<CartItemEntity[]>([]);

    const [loading, setLoading] = useState(false);

    const getItemsInCart = async () => {
        try {
            const res = await axiosInstance.get('cart/get', {
                params: {
                    userId: user.userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems(res.data.result.cartItems);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getItemsInCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelectProduct = (cartItem: CartItemEntity, checked: boolean) => {
        if (checked) {
            setSelectedItems((prev) => [...prev, cartItem]);
        } else {
            setSelectedItems((prev) => prev.filter((item) => item.bookId !== cartItem.bookId));
        }
    };

    const handleDeleteItem = async (bookId: string) => {
        try {
            await axiosInstance.delete('cart/delete', {
                params: {
                    bookId: bookId,
                    userId: user.userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartItems((prev) => prev.filter((item) => item.bookId !== bookId));
            toast.success('Delete successfully!');
        } catch (error) {
            console.log(error);
        }
    };

    const handleIncrease = async (cart: CartItemEntity) => {
        if (cart.quantity < cart.inStock) {
            setLoading(true);
            try {
                const res = await axiosInstance.put('cart/increaseQuantity', null, {
                    params: {
                        bookId: cart.bookId,
                        userId: user.userId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartItems(res.data.result.cartItems);
                console.log(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDecrease = async (cart: CartItemEntity) => {
        if (cart.quantity > 1) {
            setLoading(true);
            try {
                const res = await axiosInstance.put('cart/decreaseQuantity', null, {
                    params: {
                        bookId: cart.bookId,
                        userId: user.userId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartItems(res.data.result.cartItems);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const rows = cartItems?.map((item, index) => (
        <Table.Tr key={index} style={{ cursor: 'pointer' }}>
            <Table.Td style={{ color: 'black' }}>
                <CartItem cartItem={item} />
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Text>{`${formatNumberWithDots(item.price.toString())}₫`}</Text>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Center style={{ height: '100%' }}>
                    <Button
                        mr={'md'}
                        variant='light'
                        disabled={item.quantity == 1 || loading || item.inStock == 0}
                        onClick={() => handleDecrease(item)}
                    >
                        -
                    </Button>
                    <Text>{item?.quantity}</Text>
                    <Button
                        ml={'md'}
                        variant='light'
                        disabled={item.quantity == item.inStock || loading || item.inStock == 0}
                        onClick={() => handleIncrease(item)}
                    >
                        +
                    </Button>
                </Center>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Center style={{ height: '100%' }}>
                    <Text>{`${formatNumberWithDots(
                        (item?.quantity * item?.price).toString()
                    )}₫`}</Text>
                </Center>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Center style={{ height: '100%' }}>
                    <Checkbox
                        style={{ cursor: 'pointer' }}
                        color={'cyan'}
                        checked={selectedItems.includes(item)}
                        onChange={(e) => handleSelectProduct(item, e.target.checked)}
                    />
                </Center>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Center style={{ height: '100%' }}>
                    <CloseButton onClick={() => handleDeleteItem(item.bookId)} />
                </Center>
            </Table.Td>
        </Table.Tr>
    ));

    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Group>
            <ToastContainer
                toastStyle={{
                    marginTop: '80px',
                }}
                limit={1}
            />
            <SubBanner title={'Your cart'} direction='Search' />
            <Flex direction={'column'} pl={176} pr={176} mt={16} w={'100%'}>
                <Text fw={500} size='28px' mb={12}>
                    Your cart
                </Text>

                <Text>There are {cartItems?.length} products in your cart</Text>
            </Flex>
            {cartItems.length != 0 ? (
                <Group pl={176} pr={176} m={'auto'} justify='center' w={'100%'}>
                    <Box style={{ border: '1px solid #0097B2' }} w={'100%'} p={24}>
                        <Table horizontalSpacing={'xl'} verticalSpacing={'sm'}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>
                                        <Center>
                                            <Text size='xl' fw={500}>
                                                Product
                                            </Text>
                                        </Center>
                                    </Table.Th>
                                    <Table.Th>
                                        <Center>
                                            <Text size='xl' fw={500}>
                                                Price
                                            </Text>
                                        </Center>
                                    </Table.Th>
                                    <Table.Th>
                                        <Center>
                                            <Text size='xl' fw={500}>
                                                Quantity
                                            </Text>
                                        </Center>
                                    </Table.Th>
                                    <Table.Th>
                                        <Center>
                                            <Text size='xl' fw={500}>
                                                Total
                                            </Text>
                                        </Center>
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>

                        <hr />
                        <Group justify='flex-end'>
                            <Text
                                fs={'italic'}
                                c={'gray'}
                            >{`(${selectedItems.length} items selected)`}</Text>
                            <Text fw={500} size='lg'>
                                Total:
                            </Text>
                            <Text size='xl' c={'red'} fw={500}>{`${formatNumberWithDots(
                                totalPrice.toString()
                            )}₫`}</Text>
                        </Group>
                        <Group justify='flex-end' mt={'md'}>
                            <Button disabled={selectedItems.length == 0} color={'red'} size='lg'>
                                Make Payment
                            </Button>
                        </Group>
                    </Box>
                </Group>
            ) : (
                <Flex direction={'column'} w={'100%'} justify='center' align={'center'}>
                    <Image
                        w={200}
                        src={
                            'https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png?f=webp'
                        }
                    />
                    <Text fs={'italic'} c={'gray'}>
                        Your cart is empty now!
                    </Text>

                    <Link to={'/'}>
                        <Button
                            rightSection={<ShoppingCartCheckout fontSize='small' />}
                            mt={'md'}
                            variant='subtle'
                            color='cyan'
                        >
                            Countinue shopping
                        </Button>
                    </Link>
                </Flex>
            )}
        </Group>
    );
};

export default Cart;
