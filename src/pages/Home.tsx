import { Flex, Group, Image } from '@mantine/core';
import { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import Banner from '../component/Banner';
import Book from '../component/Book';
import HeadingSection from '../component/HeadingSection';
import { BookEntity } from '../entity/BookEntity';
import axiosInstance from '../network/httpRequest';

const Home = () => {
    const [books, setBooks] = useState<BookEntity[]>([]);

    useEffect(() => {
        const getRandomBooks = async () => {
            const res = await axiosInstance.get('/book/getRandom', {
                params: {
                    range: 10,
                },
            });

            console.log(res.data);

            if (res.data.code === 200) {
                setBooks((prevBooks) => [...prevBooks, ...res.data.result]);
            }
        };

        getRandomBooks();
    }, []);

    return (
        <div>
            <Banner />
            <div style={{ padding: '0 86px' }}>
                <HeadingSection title='New Arrival' />
                <Group mt={'lg'} mb={'xl'}>
                    <Flex direction={'row'} gap={'lg'} wrap={'wrap'} justify={'space-between'}>
                        {books.map((book) => (
                            <Book book={book} key={book.bookId} />
                        ))}
                    </Flex>
                </Group>

                <LazyLoad>
                    <Image
                        src={
                            'https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/banner.jpg?1719328894255'
                        }
                        alt='Ads'
                    />
                </LazyLoad>
            </div>
        </div>
    );
};

export default Home;
