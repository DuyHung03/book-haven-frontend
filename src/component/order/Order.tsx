import { Divider, Flex, Group, Image, Text, UnstyledButton } from '@mantine/core';
import { Link } from 'react-router-dom';
import { OrderEntity } from '../../entity/OrderItemEntity';
import { formatNumberWithDots } from '../../util/utils';

const Order = ({ order }: { order: OrderEntity }) => {
    return (
        <UnstyledButton
            w={'100%'}
            mt={12}
            mb={12}
            p={12}
            style={{ borderBottom: '1px solid #ccc' }}
        >
            <Link to={`/user/order/${order.orderId}`} state={order}>
                <Text fs={'italic'} c={'dark'} pb={24}>
                    Order id: {order.orderId}
                </Text>
                <Group w={'100%'}>
                    {order.orderItems.map((item, index) => (
                        <Group w={'100%'} key={index}>
                            <Image
                                key={index}
                                src={item.imgUrls[0]}
                                w={70}
                                fallbackSrc='https://images.penguinrandomhouse.com/cover/9781250301697'
                            />
                            <Flex direction={'column'} justify={'space-between'} c={'dark'}>
                                <Text>{item.title}</Text>
                                <Text c={'gray'}>x{item.quantity}</Text>
                            </Flex>
                        </Group>
                    ))}
                </Group>
                <Divider my={'md'} />
                <Text c={'dark'} fw={500}>
                    TOTAL: {`${formatNumberWithDots(order.totalAmount.toString())} VND`}
                </Text>
            </Link>
        </UnstyledButton>
    );
};

export default Order;
