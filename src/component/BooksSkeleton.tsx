import { Flex, Skeleton } from '@mantine/core';

function BooksSkeleton() {
    return (
        <Flex direction={'row'} gap={'lg'} wrap={'wrap'} justify={'space-between'}>
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
