import { Avatar, Group, Text } from '@mantine/core';

function SideBar() {
    return (
        <Group w={'100%'}>
            <Group align='center' justify='center' w={'100%'}>
                <Avatar name='Admin' color='initials' />
                <Text></Text>
            </Group>
        </Group>
    );
}

export default SideBar;
