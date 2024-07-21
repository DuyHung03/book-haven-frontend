import { Button, Center, Flex, Group, Loader, Text } from '@mantine/core';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Book from '../component/Book';
import SubBanner from '../component/SubBanner';
import { BookEntity } from '../entity/BookEntity';
import axiosInstance from '../network/httpRequest';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState<BookEntity[]>([]);
    const query = searchParams.get('query');
    const genre = searchParams.get('genre');
    const [pageNo, setPageNo] = useState(1);
    const [loading, setLoading] = useState(false);

    const searchBooksByQuery = async (query: string) => {
        try {
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
        } catch (error) {
            console.log(error);
        }
    };

    const searchBooksByGenre = async (genre: string) => {
        try {
            const res = await axiosInstance.get('/book/getByGenre', {
                params: {
                    genreName: genre,
                    pageNo: pageNo,
                    pageSize: 12,
                },
            });

            console.log(res);

            if (res.data.code === 200) {
                setBooks(res.data.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                if (query != null) {
                    await searchBooksByQuery(query);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [query, pageNo]);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                if (genre != null) {
                    await searchBooksByGenre(genre);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [genre, pageNo]);

    const handlePrevPage = () => {
        if (pageNo > 1) setPageNo(pageNo - 1);
    };

    const handleNextPage = () => {
        if (books.length === 12) setPageNo(pageNo + 1);
    };

    return (
        <Group>
            <SubBanner title={`Looking for: ${query ? query : genre}`} direction='Search' />

            <Flex direction='column' pl={176} pr={176} mt={16} w='100%'>
                <Text fw={500} size='28px' mb={12}>
                    Search page
                </Text>

                <Text>
                    There are {books.length} matching search results on <b>Page: {pageNo}</b>
                </Text>
            </Flex>
            {loading ? (
                <Center w={'100%'}>
                    <Loader />
                </Center>
            ) : (
                <Flex
                    direction='row'
                    gap='lg'
                    wrap='wrap'
                    justify='space-evenly'
                    pl={176}
                    pr={176}
                    w='100%'
                >
                    {books.map((book) => (
                        <Book book={book} key={book.bookId} />
                    ))}
                </Flex>
            )}
            <Group justify='center' align='center' w='100%' mt='lg'>
                <Button
                    onClick={handlePrevPage}
                    disabled={pageNo === 1}
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
