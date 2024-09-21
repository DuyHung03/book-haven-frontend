import { Button, Center, Flex, Grid, GridCol, Group, Text } from '@mantine/core';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Book from '../component/Book';
import BooksSkeleton from '../component/BooksSkeleton';
import SubBanner from '../component/SubBanner';
import { BooksResponse } from '../entity/BookEntity';
import axiosInstance from '../network/httpRequest';
import usePageTitle from '../util/usePageTitle';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const genre = searchParams.get('genre');
    const [pageNo, setPageNo] = useState(0);

    usePageTitle(query || genre || 'Search');

    const searchBooks = async () => {
        if (query) {
            const res = await axiosInstance.get('/book/search', {
                params: {
                    bookName: query,
                    pageNo: pageNo,
                    pageSize: 12,
                },
            });
            console.log(res);

            return res.data.result;
        } else if (genre) {
            const res = await axiosInstance.get('/book/getByGenre', {
                params: {
                    genreName: genre,
                    pageNo: pageNo,
                    pageSize: 10,
                },
            });
            console.log(res);
            return res.data.result;
        }
    };

    const { data, isLoading, isError } = useQuery<BooksResponse>({
        queryKey: ['books', pageNo, query, genre],
        queryFn: searchBooks,
        staleTime: 1000 * 60 * 5, //5 mins
    });

    useEffect(() => {
        setPageNo(0);
    }, [query, genre]);

    const handlePrevPage = () => {
        if (pageNo > 0) setPageNo((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (pageNo < (data?.totalPage ?? 0) - 1) setPageNo((prev) => prev + 1);
    };
    return (
        <Group>
            <SubBanner title={`Looking for: ${query ? query : genre}`} direction='Search' />

            <Flex direction='column' pl={176} pr={176} mt={16} w='100%'>
                <Text fw={500} size='28px' mb={12}>
                    Search page
                </Text>

                <Text>
                    There are <b>{data?.totalCount}</b> matching search results |{' '}
                    <b>Page: {pageNo + 1}</b>
                </Text>
            </Flex>
            {isLoading ? (
                <Center w={'100%'}>
                    <BooksSkeleton />
                </Center>
            ) : (
                // <Flex
                //     direction='row'
                //     gap='lg'
                //     wrap='wrap'
                //     justify='space-evenly'
                //     pl={176}
                //     pr={176}
                //     w='100%'
                // >
                //     {data?.books.map((book) => (
                //         <Book book={book} key={book.bookId} />
                //     ))}
                // </Flex>

                <Grid pl={176} pr={176} w='100%'>
                    {data?.books.map((book) => (
                        <GridCol span={2} key={book.bookId}>
                            <Book book={book} />
                        </GridCol>
                    ))}
                </Grid>
            )}
            {isError && (
                <Center w={'100%'}>
                    <Text c='red'>An error occurred while fetching data.</Text>
                </Center>
            )}
            <Group justify='center' align='center' w='100%' mt='lg'>
                <Button
                    onClick={handlePrevPage}
                    disabled={pageNo === 0}
                    variant='light'
                    size='lg'
                    color='cyan'
                    leftSection={<ArrowLeft />}
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNextPage}
                    disabled={pageNo >= (data?.totalPage ?? 0) - 1}
                    variant='light'
                    size='lg'
                    color='cyan'
                    rightSection={<ArrowRight />}
                >
                    Next
                </Button>
            </Group>
        </Group>
    );
};

export default Search;
