import { Button, Center, Checkbox, CloseButton, Group, Image, Table, Text } from '@mantine/core';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { CartItemEntity } from '../entity/CartItemEntity';
import { formatNumberWithDots } from '../util/utils';

const CartItem = memo(
    ({
        cartItem,
        onDecrease,
        onIncrease,
        onDelete,
        onSelect,
        isChecked,
        loading,
    }: {
        cartItem: CartItemEntity;
        onDecrease: (cartItem: CartItemEntity) => void;
        onIncrease: (cartItem: CartItemEntity) => void;
        onDelete: (bookId: string) => void;
        onSelect: (cartItem: CartItemEntity, checked: boolean) => void;
        isChecked: boolean;
        loading: boolean;
    }) => (
        <Table.Tr style={{ cursor: 'pointer' }}>
            <Table.Td style={{ color: 'black' }}>
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
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Text>{`${formatNumberWithDots(cartItem.price.toString())}₫`}</Text>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Center style={{ height: '100%' }}>
                    <Button
                        mr={'md'}
                        variant='light'
                        disabled={cartItem.quantity === 1 || loading || cartItem.inStock === 0}
                        onClick={() => onDecrease(cartItem)}
                    >
                        -
                    </Button>
                    <Text>
                        {cartItem.quantity > cartItem.inStock
                            ? cartItem.inStock
                            : cartItem.quantity}
                    </Text>
                    <Button
                        ml={'md'}
                        variant='light'
                        disabled={
                            cartItem.quantity === cartItem.inStock ||
                            loading ||
                            cartItem.inStock === 0
                        }
                        onClick={() => onIncrease(cartItem)}
                    >
                        +
                    </Button>
                </Center>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Center style={{ height: '100%' }}>
                    <Text>{`${formatNumberWithDots(
                        (cartItem.quantity * cartItem.price).toString()
                    )}₫`}</Text>
                </Center>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Center style={{ height: '100%' }}>
                    <Checkbox
                        style={{ cursor: 'pointer' }}
                        color={'cyan'}
                        checked={isChecked}
                        onChange={(e) => onSelect(cartItem, e.target.checked)}
                    />
                </Center>
            </Table.Td>
            <Table.Td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Center style={{ height: '100%' }}>
                    <CloseButton onClick={() => onDelete(cartItem.bookId)} />
                </Center>
            </Table.Td>
        </Table.Tr>
    )
);

export default CartItem;
