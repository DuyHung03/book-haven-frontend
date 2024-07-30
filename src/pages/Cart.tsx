import { Box, Button, Center, Flex, Group, Image, Table, Text } from '@mantine/core';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CartItem from '../component/CartItem';
import SubBanner from '../component/SubBanner';
import { CartItemEntity } from '../entity/CartItemEntity';
import axiosInstance from '../network/httpRequest';
import useCartStore from '../store/useCartStore';
import useUserStore from '../store/useUserStore';
import { formatNumberWithDots } from '../util/utils';

const Cart = () => {
    const { user } = useUserStore();
    const { setCartItem } = useCartStore();

    const [cartItems, setCartItems] = useState<CartItemEntity[]>([]);
    const [selectedItems, setSelectedItems] = useState<CartItemEntity[]>([]);
    const [loading, setLoading] = useState(false);

    const getItemsInCart = async () => {
        try {
            const res = await axiosInstance.get('cart/get', {
                params: { userId: user.userId },
                withCredentials: true,
            });
            setCartItems(res.data.result.cartItems);
            setCartItem(res.data.result.cartItems);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getItemsInCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelectProduct = useCallback((cartItem: CartItemEntity, checked: boolean) => {
        if (checked) {
            setSelectedItems((prev) => [...prev, cartItem]);
        } else {
            setSelectedItems((prev) => prev.filter((item) => item.bookId !== cartItem.bookId));
        }
    }, []);

    const handleDeleteItem = async (bookId: string) => {
        try {
            const res = await axiosInstance.delete('cart/delete', {
                params: { bookId, userId: user.userId },
                withCredentials: true,
            });
            setCartItems((prev) => prev.filter((item) => item.bookId !== bookId));
            setSelectedItems([]);
            setCartItem(res.data.result.cartItems);
            toast.success('Delete successfully!');
        } catch (error) {
            console.log(error);
        }
    };

    const handleIncrease = async (cartItem: CartItemEntity) => {
        if (cartItem.quantity < cartItem.inStock) {
            setLoading(true);
            try {
                const res = await axiosInstance.put('cart/increaseQuantity', null, {
                    params: { bookId: cartItem.bookId, userId: user.userId },
                    withCredentials: true,
                });
                setCartItems(res.data.result.cartItems);
                setSelectedItems([]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDecrease = async (cartItem: CartItemEntity) => {
        if (cartItem.quantity > 1) {
            setLoading(true);
            try {
                const res = await axiosInstance.put('cart/decreaseQuantity', null, {
                    params: { bookId: cartItem.bookId, userId: user.userId },
                    withCredentials: true,
                });
                setSelectedItems([]);
                setCartItems(res.data.result.cartItems);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const rows = cartItems?.map((item, index) => (
        <CartItem
            key={index}
            cartItem={item}
            onDecrease={handleDecrease}
            onIncrease={handleIncrease}
            onDelete={handleDeleteItem}
            onSelect={handleSelectProduct}
            isChecked={selectedItems.includes(item)}
            loading={loading}
        />
    ));

    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <div>
            <ToastContainer toastStyle={{ marginTop: '140px' }} limit={1} />
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
                            <Link to={`/checkout/${user.userId}`} state={selectedItems}>
                                <Button
                                    disabled={selectedItems.length == 0}
                                    color={'red'}
                                    size='lg'
                                >
                                    Make Payment
                                </Button>
                            </Link>
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
                            Continue shopping
                        </Button>
                    </Link>
                </Flex>
            )}
        </div>
    );
};

export default Cart;
