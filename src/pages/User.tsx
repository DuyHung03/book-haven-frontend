import { Grid, Group } from '@mantine/core';
import { useState } from 'react';
import Orders from '../component/order/Orders';
import Profile from '../component/profile/Profile';
import SideBar from '../component/SideBar';

const User = () => {
    const [selected, setSelected] = useState<string>('orders');

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
