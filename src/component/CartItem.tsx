import { Group, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { CartItemEntity } from '../entity/CartItemEntity';

const CartItem = ({ cartItem }: { cartItem: CartItemEntity }) => {
    return (
        <Link to={`/book/${cartItem.title}`} state={cartItem} style={{ color: 'black' }}>
            <Group grow>
                <Image
                    src={cartItem.imgUrls[0]}
                    alt=''
                    w={76}
                    mr={50}
                    fallbackSrc='https://images.penguinrandomhouse.com/cover/9781250301697'
                />
                <Text size='md'>{cartItem.title}</Text>
            </Group>
        </Link>
    );
};

export default CartItem;
