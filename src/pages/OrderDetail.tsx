import { Button, Divider, Flex, Group, Image, Text } from '@mantine/core';
import { ArrowLeft } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderEntity } from '../entity/OrderItemEntity';
import { formatNumberWithDots } from '../util/utils';

function OrderDetail() {
    const location = useLocation();
    const order: OrderEntity = location.state;

    const navigate = useNavigate();

    console.log(order);

    return (
        <Group m={'auto'} maw={700} w={'100%'} pt={24}>
            <Flex w={'100%'} direction={'row'} justify={'space-between'} align={'center'}>
                <Button
                    size='lg'
                    radius={'md'}
                    leftSection={<ArrowLeft />}
                    variant='subtle'
                    color='cyan'
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <Text>Order ID: {order.orderId}</Text>
            </Flex>
            <Group w={'100%'} justify='flex-end'>
                <Text>DATE: {order.orderDate}</Text>
            </Group>
            <Divider my={'md'} w={'100%'} />
            <Flex direction={'column'} justify={'center'} align={'center'} w={'100%'}>
                {order.orderItems.map((item, index) => (
                    <Group w={'100%'} mb={20} h={110}>
                        <Image
                            key={index}
                            src={item.imgUrls[0]}
                            w={70}
                            fallbackSrc='https://images.penguinrandomhouse.com/cover/9781250301697'
                        />
                        <Flex direction={'column'} justify={'space-between'} c={'dark'} h={'100%'}>
                            <Text fw={500} size='lg'>
                                {item.title}
                            </Text>
                            <Text c={'gray'}>x{item.quantity}</Text>
                            <Text c={'gray'}>{`${formatNumberWithDots(
                                item.price.toString()
                            )} VND`}</Text>
                        </Flex>
                    </Group>
                ))}
            </Flex>
            <Divider my={'md'} w={'100%'} />
            <Text fw={500} size='lg' c={'red'} fs={'italic'}>
                TOTAL: {`${formatNumberWithDots(order.totalAmount.toString())} VND`}
            </Text>
        </Group>
    );
}

export default OrderDetail;
