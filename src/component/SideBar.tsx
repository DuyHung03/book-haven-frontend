import { Button, Divider, Flex, Group, Text } from '@mantine/core';
import { Info, Person, Settings, ShoppingBag } from '@mui/icons-material';
import { memo } from 'react';
import useAuthStore from '../store/useAuthStore';
import useUserStore from '../store/useUserStore';
import UserProfile from './UserProfile';

const items = [
    {
        id: 'orders',
        label: 'Orders',
        icon: <ShoppingBag fontSize='medium' color='error' />,
    },
    {
        id: 'profile',
        label: 'Profile',
        icon: <Person fontSize='medium' color='disabled' />,
    },
    { id: 'settings', label: 'Setting', icon: <Settings fontSize='medium' color='info' /> },
    { id: 'about', label: 'About', icon: <Info fontSize='medium' color='disabled' /> },
];

const SideBar = memo(
    ({ selected, onSelect }: { selected: string; onSelect: (select: string) => void }) => {
        const { clearUser } = useUserStore();
        const { logout } = useAuthStore();

        const handleLogout = () => {
            clearUser();
            logout();
        };

        return (
            <Group p={12} w={'100%'}>
                <UserProfile />
                <Divider my={'md'} w={'100%'} />
                <Group>
                    {items.map((item) => (
                        <Button
                            fullWidth
                            variant={selected === item.id ? 'light' : 'transparent'}
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                        >
                            <Flex
                                w={'100%'}
                                direction={'row'}
                                align={'center'}
                                justify={'flex-start'}
                            >
                                <Group mr={12}>{item.icon}</Group>
                                <Text c={'dark'}>{item.label}</Text>
                            </Flex>
                        </Button>
                    ))}
                </Group>
                <Divider my={'md'} w={'100%'} />
                <Button color='cyan' fullWidth variant='light' onClick={handleLogout}>
                    Log Out
                </Button>
            </Group>
        );
    }
);

export default SideBar;
