import {
    Button,
    Center,
    Flex,
    Group,
    Image,
    Loader,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    Text,
} from '@mantine/core';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderEntity } from '../entity/OrderItemEntity';
import axiosInstance from '../network/httpRequest';
import useUserStore from '../store/useUserStore';
import Order from './order/Order';

function Orders() {
    const { user } = useUserStore();
    const [activeTab, setActiveTab] = useState<string>('all');

    // const [pending, setPending] = useState<OrderEntity[]>([]);
    const getOrders = async () => {
        const res = await axiosInstance.get('order/getByUserId', {
            params: {
                userId: user.userId,
            },
            withCredentials: true,
        });
        return res.data.result;
    };

    const { data, isLoading } = useQuery<OrderEntity[]>({
        queryKey: ['orders'],
        queryFn: getOrders,
    });

    const handleActiveTab = (value: string | null) => {
        setActiveTab(value!);
    };

    return (
        <Group w={'100%'} p={24}>
            <Tabs w={'100%'} value={activeTab} onChange={handleActiveTab} color='cyan'>
                <TabsList grow>
                    <TabsTab value={'all'}>All</TabsTab>
                    <TabsTab value={'to-cancel'}>To cancel</TabsTab>
                </TabsList>

                <TabsPanel value={'all'}>
                    {isLoading ? (
                        <Center w={'100%'}>
                            <Loader />
                        </Center>
                    ) : data!.length > 0 ? (
                        data?.map((order) => <Order key={order.orderId} order={order} />)
                    ) : (
                        <Flex direction={'column'} w={'100%'} justify='center' align={'center'}>
                            <Image
                                w={200}
                                src={
                                    'https://cdn3d.iconscout.com/3d/free/thumb/free-no-results-3543014-2969401.png'
                                }
                            />
                            <Text fs={'italic'} c={'gray'}>
                                Yout don't have any orders!
                            </Text>
                            <Link to={'/'}>
                                <Button
                                    rightSection={<ShoppingCartCheckout fontSize='small' />}
                                    mt={'md'}
                                    variant='subtle'
                                    color='cyan'
                                >
                                    Continue shopping
                                </Button>
                            </Link>
                        </Flex>
                    )}
                </TabsPanel>
                <TabsPanel value={'to-cancel'}>
                    <div>Orders to return content goes here.</div>
                </TabsPanel>
            </Tabs>
        </Group>
    );
}

export default Orders;
