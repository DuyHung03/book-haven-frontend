import { Card, CardSection, Flex, Image, Rating, Text, UnstyledButton } from '@mantine/core';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import { BookEntity } from '../entity/BookEntity';
import { formatNumberWithDots } from '../util/formatPrice';

const Book = ({ book }: { book: BookEntity }) => {
    return (
        <Link to={`/book/${book.title}`}>
            <Card withBorder w={250} shadow='md' radius={'md'}>
                <CardSection>
                    <LazyLoad>
                        <Image
                            src={book.imgUrls}
                            h={250}
                            fallbackSrc={
                                'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png'
                            }
                            alt={book.title}
                        />
                    </LazyLoad>
                </CardSection>

                <Text fw={600} truncate={'end'} size='xl' mt={'md'}>
                    {book.title}
                </Text>
                <Text c='blue' fw={500} mb={'xs'}>
                    {`${formatNumberWithDots(book.price)} VND`}
                </Text>
                <Flex direction={'row'} justify={'space-between'} align={'center'}>
                    <Rating value={book.rating ?? 4} />
                    <UnstyledButton>
                        <FavoriteBorderOutlined />
                    </UnstyledButton>
                </Flex>
            </Card>
        </Link>
    );
};

export default Book;
