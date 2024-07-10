import { Flex, Group, Image, Text } from '@mantine/core';
import { memo } from 'react';
import { CartItemEntity } from '../entity/CartItemEntity';
import { formatNumberWithDots } from '../util/formatPrice';

export default memo(function OrderItem({ cartItem }: { cartItem: CartItemEntity }) {
    const img = cartItem.imgUrls[0]
        ? cartItem.imgUrls[0]
        : 'https://images.penguinrandomhouse.com/cover/9781250301697';

    return (
        <Flex justify={'space-between'} mb={12} w={'100%'}>
            <Image w={70} src={img} alt='' mr={12} />
            <Flex direction={'column'} justify={'flex-start'} w={'100%'}>
                <Text>{cartItem.title}</Text>
                <Group justify='space-between' w={'100%'}>
                    <Text fs={'italic'}>
                        <b>Price: </b>
                        {`${formatNumberWithDots(
                            (cartItem.quantity * cartItem.price).toString()
                        )} VND`}
                    </Text>
                    <Text fs={'italic'} c={'gray'}>
                        x{cartItem.quantity}
                    </Text>
                </Group>
            </Flex>
        </Flex>
    );
});
