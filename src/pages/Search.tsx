import { Flex, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Book from '../component/Book';
import GenreBar from '../component/GenreBar';
import SubBanner from '../component/SubBanner';
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
            <SubBanner title={`Looking for: ${query}`} direction='Search' />

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
