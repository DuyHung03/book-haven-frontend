import { Button, Flex, Group, Text } from '@mantine/core';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
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
    const [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const searchBooks = async (query: string) => {
            const res = await axiosInstance.get('/book/search', {
                params: {
                    bookName: query,
                    pageNo: pageNo,
                    pageSize: 12,
                },
            });

            console.log(res);

            if (res.data.code === 200) {
                setBooks(res.data.result);
            }
        };
        if (query != null) searchBooks(query);
    }, [query, pageNo]);

    const handlePrevPage = () => {
        if (pageNo > 1) setPageNo(pageNo - 1);
    };

    const handleNextPage = () => {
        if (books.length == 12) setPageNo(pageNo + 1);
    };

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
            <Group justify='center' align='center' w={'100%'} mt={'lg'}>
                <Button
                    onClick={handlePrevPage}
                    disabled={pageNo == 1}
                    variant='light'
                    size='lg'
                    leftSection={<ArrowLeft />}
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNextPage}
                    disabled={books.length < 12}
                    variant='light'
                    size='lg'
                    rightSection={<ArrowRight />}
                >
                    Next
                </Button>
            </Group>
        </Group>
    );
};

export default Search;
