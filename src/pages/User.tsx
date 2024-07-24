import { Grid, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import Orders from '../component/Orders';
import Profile from '../component/Profile';
import SideBar from '../component/SideBar';
import useUserStore from '../store/useUserStore';

const User = () => {
    const [selected, setSelected] = useState<string>('orders');
    const { user } = useUserStore();
    useEffect(() => {
        if (user.userId == null) window.location.href = '/login';
    }, []);

    const renderSelectedComponent = () => {
        switch (selected) {
            case 'orders':
                return <Orders />;
            case 'profile':
                return <Profile />;
            case 'settings':
                return <Profile />;
            case 'about':
                return <Profile />;
            default:
                return null;
        }
    };

    return (
        <Group w={'100%'} pr={86} pl={86}>
            <Grid w={'100%'}>
                <Grid.Col span={2}>
                    <SideBar selected={selected} onSelect={setSelected} />
                </Grid.Col>
                <Grid.Col span={10}>{renderSelectedComponent()}</Grid.Col>
            </Grid>
        </Group>
    );
};

export default User;
