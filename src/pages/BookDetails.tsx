import {
    Button,
    Card,
    Center,
    Flex,
    Grid,
    GridCol,
    Group,
    Image,
    Rating,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { Add, AddShoppingCart, FavoriteBorder, Remove } from '@mui/icons-material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import { ToastContainer, toast } from 'react-toastify';
import { BookEntity } from '../entity/BookEntity';
import axiosInstance from '../network/httpRequest';
import useCartStore from '../store/useCartStore';
import useUserStore from '../store/useUserStore';
import { formatNumberWithDots } from '../util/formatPrice';
const BookDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUserStore();
    const { setCartItem } = useCartStore();

    const book: BookEntity = location.state;
    const theme = useMantineTheme();

    const [value, setValue] = useState(1);

    const [loading, setLoading] = useState(false);

    const handleAddtocart = async () => {
        if (user.userId) {
            console.log(book);

            setLoading(true);

            try {
                const res = await axiosInstance.post('/cart/add', null, {
                    params: {
                        userId: user.userId,
                        bookId: book.bookId,
                        quantity: value,
                    },
                    withCredentials: true,
                });

                if (res.data.code === 200) {
                    toast.success('Add to cart successfully', {
                        position: 'top-right',
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                    console.log(res.data.result);

                    setCartItem(res.data.result.cartItems);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        } else {
            navigate('/login');
        }
    };

    const handleAddToFavorite = () => {
        if (user.userId) console.log(book);
        else {
            navigate('/login');
        }
    };

    return (
        <Group>
            <ToastContainer
                toastStyle={{
                    marginTop: '140px',
                }}
                limit={1}
            />

            <Grid pl={176} pr={176} mt={24} w={'100%'} grow>
                <GridCol span={4}>
                    <div style={{ width: '300px' }}>
                        {book.imgUrls?.length ? (
                            <Slide canSwipe={false} autoplay={false} indicators>
                                {book.imgUrls.map((url, index) => (
                                    <div key={index}>
                                        <img src={url} alt='img' />
                                    </div>
                                ))}
                            </Slide>
                        ) : (
                            <Image src='https://images.penguinrandomhouse.com/cover/9781250301697' />
                        )}
                    </div>
                </GridCol>
                <GridCol span={4}>
                    <Flex direction={'column'}>
                        <Text fw={400} size='28px' mb={24}>
                            {book.title}
                        </Text>
                        <Text>
                            <b> Author:</b> {book.authorName}
                        </Text>
                        <Text mt={'sm'}>
                            <b> Genres:</b> {book.genreNameList?.join(', ')}
                        </Text>

                        <Rating value={book.rating ?? 0} mt={'sm'} readOnly />

                        <Card radius={12} maw={250} bg={theme.colors.orange[6]} mt={'md'}>
                            <Center>
                                <Text size='26px' c={'white'} fw={500}>
                                    {`${formatNumberWithDots(book.price)} VND`}
                                </Text>
                            </Center>
                        </Card>

                        <Text mt={'md'}></Text>
                        <Text mt={'md'}>
                            <b>Publication Year: </b>
                            {book.publicationYear}
                        </Text>
                        <Text mt={'md'}>
                            <b>Isbn: </b>
                            {book.isbn}
                        </Text>
                        <Text mt={'md'}>
                            <b>Pages: </b>
                            {book.pageCount}
                        </Text>
                    </Flex>
                </GridCol>
                <GridCol span={4}>
                    <Flex justify={'flex-start'} direction={'column'} h={'100%'} p={24}>
                        <Group mt={'md'}>
                            <Text fw={500}>Quantity:</Text>
                            <Button
                                variant='outline'
                                color={'gray'}
                                size='xs'
                                disabled={book.quantityInStock == 0 || value == 1}
                                onClick={() => {
                                    setValue(value - 1);
                                }}
                            >
                                {<Remove />}
                            </Button>
                            <Text>{book.quantityInStock > 0 ? value : 0}</Text>
                            <Button
                                variant='outline'
                                color={'gray'}
                                size='xs'
                                disabled={
                                    book.quantityInStock == 0 || value >= book.quantityInStock
                                }
                                onClick={() => {
                                    setValue(value + 1);
                                }}
                            >
                                {<Add />}
                            </Button>
                        </Group>
                        {book.quantityInStock != 0 ? (
                            <Text
                                td={'underline'}
                                fs={'italic'}
                                mt={'sm'}
                                c={'gray'}
                            >{`In stock: ${book.quantityInStock}`}</Text>
                        ) : (
                            <Text fs={'italic'} mt={'sm'} c={'red'}>
                                Out of stock!
                            </Text>
                        )}

                        <Button
                            color={'cyan'}
                            size='lg'
                            mt={'md'}
                            leftSection={<AddShoppingCart />}
                            loading={loading}
                            disabled={book.quantityInStock <= 0}
                            onClick={handleAddtocart}
                        >
                            Add to cart
                        </Button>
                        <Button
                            variant='transparent'
                            mt={'md'}
                            color='gray'
                            leftSection={<FavoriteBorder />}
                            onClick={handleAddToFavorite}
                        >
                            Add to favorites
                        </Button>
                    </Flex>
                </GridCol>
            </Grid>
        </Group>
    );
};

export default BookDetails;
