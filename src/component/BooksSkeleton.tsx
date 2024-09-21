import { Flex, Skeleton } from '@mantine/core';

function BooksSkeleton() {
    return (
        <Flex
            direction={'row'}
            gap={'lg'}
            wrap={'wrap'}
            justify={'space-between'}
            style={{ maxWidth: '80%', margin: '0 auto' }}
        >
            <Skeleton visible={true} w={250} h={350}></Skeleton>
            <Skeleton visible={true} w={250} h={350}></Skeleton>
            <Skeleton visible={true} w={250} h={350}></Skeleton>
            <Skeleton visible={true} w={250} h={350}></Skeleton>
            <Skeleton visible={true} w={250} h={350}></Skeleton>
            <Skeleton visible={true} w={250} h={350}></Skeleton>
            <Skeleton visible={true} w={250} h={350}></Skeleton>
            <Skeleton visible={true} w={250} h={350}></Skeleton>
            <Skeleton visible={true} w={250} h={350}></Skeleton>
            <Skeleton visible={true} w={250} h={350}></Skeleton>
        </Flex>
    );
}

export default BooksSkeleton;
