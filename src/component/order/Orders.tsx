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
import { OrderEntity } from '../../entity/OrderItemEntity';
import axiosInstance from '../../network/httpRequest';
import useUserStore from '../../store/useUserStore';
import Order from './Order';

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

    const {
        data = [],
        isLoading,
        isError,
    } = useQuery<OrderEntity[]>({
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
                        <Center w={'100%'} mt={24}>
                            <Loader />
                        </Center>
                    ) : data!.length > 0 ? (
                        data?.map((order, index) => <Order key={index} order={order} />)
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
                    {isError && (
                        <Center w={'100%'}>
                            <Text c='red'>An error occurred while fetching data.</Text>
                        </Center>
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
