import { Avatar, Flex, Text } from '@mantine/core';
import useUserStore from '../store/useUserStore';

function UserProfile() {
    const { user } = useUserStore();

    return (
        <Flex w={'100%'} direction={'column'} justify={'flex-start'} align={'center'}>
            <Avatar size={'xl'} src={user.photoUrl} alt=''>
                {user.email}
            </Avatar>
            <Text fw={500} size='sm' mt={8}>
                {user.email}
            </Text>
        </Flex>
    );
}

export default UserProfile;
