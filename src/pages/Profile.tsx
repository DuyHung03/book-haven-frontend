import { Button, Center, Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const Profile = () => {
    const { user, clearUser } = useUserStore();
    const navigate = useNavigate();
    const handleLogout = () => {
        clearUser();
        navigate('/');
    };

    return (
        <Center>
            <Flex justify={'center'} direction={'column'} w={300} align={'center'}>
                <Text mb={'lg'} size='xl'>
                    {user.email}
                </Text>
                <Button size='lg' onClick={handleLogout}>
                    Log out
                </Button>
            </Flex>
        </Center>
    );
};

export default Profile;
