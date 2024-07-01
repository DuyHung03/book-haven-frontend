import { BackgroundImage, Box, Flex, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Book from '../component/Book';
import GenreBar from '../component/GenreBar';
import { BookEntity } from '../entity/BookEntity';
import axiosInstance from '../network/httpRequest';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState<BookEntity[]>([]);
    const query = searchParams.get('query');

    useEffect(() => {
        const searchBooks = async (query: string) => {
            const res = await axiosInstance.get('/book/search', {
                params: {
                    bookName: query,
                },
            });
            console.log(res);

            if (res.data.code === 200) {
                setBooks(res.data.result);
            }
        };
        if (query != null) searchBooks(query);
    }, [query]);

    return (
        <Group>
            <GenreBar />
            <Box w={'100%'}>
                <BackgroundImage src='https://bizweb.dktcdn.net/100/364/248/themes/736344/assets/bg_breadcrumb.jpg?1719328879911'>
                    <Flex direction={'column'} p={90} justify={'center'} align={'center'}>
                        <Text c='white' size='36px' fw={500} mb={12}>
                            Looking for: {query}
                        </Text>
                        <Group>
                            <Link to={'/'}>
                                <Text c={'white'} td={'underline'}>
                                    Home
                                </Text>
                            </Link>
                            <Text c={'white'}>{'>'}</Text>
                            <Text c={'white'}>Search</Text>
                        </Group>
                    </Flex>
                </BackgroundImage>
            </Box>

            <Flex direction={'column'} pl={176} pr={176} mt={16} w={'100%'}>
                <Text fw={500} size='28px' mb={12}>
                    Search page
                </Text>

                <Text>There are {books.length} matching search results</Text>
            </Flex>

            <Flex
                direction={'row'}
                gap={'lg'}
                wrap={'wrap'}
                justify={'space-evenly'}
                pl={176}
                pr={176}
                w={'100%'}
            >
                {books.map((book) => (
                    <Book book={book} key={book.bookId} />
                ))}
            </Flex>
        </Group>
    );
};

export default Search;
