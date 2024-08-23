import { Avatar, Group, Text } from '@mantine/core';
import useUserStore from '../../store/useUserStore';

function SideBar() {
    const { user } = useUserStore();
    return (
        <Group w={'100%'} pt={24} pb={24}>
            <Group align='center' justify='center' w={'100%'}>
                <Avatar name='Admin' color='initials' size={'xl'} />
                <Text fw={500} size='sm' mt={8}>
                    {user.email}
                </Text>
            </Group>
        </Group>
    );
}

export default SideBar;
