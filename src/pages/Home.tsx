import { Flex, Group, Image } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import LazyLoad from 'react-lazy-load';
import Banner from '../component/Banner';
import Book from '../component/Book';
import BooksSkeleton from '../component/BooksSkeleton';
import HeadingSection from '../component/HeadingSection';
import { BookEntity } from '../entity/BookEntity';
import axiosInstance from '../network/httpRequest';

const Home = () => {
    const getRandomBooks = async () => {
        const res = await axiosInstance.get('/book/getRandom', {
            params: {
                range: 10,
            },
        });

        return res.data.result;
    };

    const { data, isLoading } = useQuery<BookEntity[]>({
        queryKey: ['books'],
        queryFn: () => getRandomBooks(),
    });

    return (
        <div>
            <Banner />
            <div style={{ padding: '0 86px' }}>
                <HeadingSection title='New Arrival' />
                <Group mt={'lg'} mb={'xl'}>
                    {!isLoading ? (
                        <Flex direction={'row'} gap={'lg'} wrap={'wrap'} justify={'space-between'}>
                            {data?.map((book) => (
                                <Book book={book} key={book.bookId} />
                            ))}
                        </Flex>
                    ) : (
                        <BooksSkeleton />
                    )}
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
