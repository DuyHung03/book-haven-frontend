import { Button, Divider, Flex, Grid, GridCol, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';
import { hidePhoneNumber } from '../../util/formatPrice';
import UserAvatar from './UserAvatar';

function Profile() {
    const { user } = useUserStore();

    return (
        <>
            <Group w={'100%'} p={24}>
                <Group gap={1} w={'100%'}>
                    <Text fw={500} size='lg' c={'dark'}>
                        My Profile
                    </Text>
                    <Text size='md' c={'gray'} w={'100%'}>
                        Manage profile information to secure your account
                    </Text>
                    <Divider w={'100%'} mt={14} />
                </Group>
                <Grid w={'100%'} grow>
                    <GridCol span={8}>
                        <Flex direction={'column'} w={'100%'} gap={16}>
                            <Flex justify={'space-between'} w={'100%'}>
                                <Text ta={'right'} w={'30%'} c={'gray'} fw={500}>
                                    Email:
                                </Text>
                                <Text ta={'left'} w={'70%'} pl={12} c={'dark'} lts={0.2}>
                                    {user.email}
                                </Text>
                            </Flex>
                            <Flex justify={'space-between'} w={'100%'}>
                                <Text ta={'right'} w={'30%'} c={'gray'} fw={500}>
                                    Name:
                                </Text>
                                <Text ta={'left'} w={'70%'} pl={12} c={'dark'} lts={0.2}>
                                    {user.email}
                                </Text>
                            </Flex>
                            <Flex justify={'space-between'} w={'100%'}>
                                <Text ta={'right'} w={'30%'} c={'gray'} fw={500}>
                                    Phone:
                                </Text>
                                <Text ta={'left'} w={'70%'} pl={12} c={'dark'} lts={0.2}>
                                    {user.phone ? hidePhoneNumber(user.phone) : ''}
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex
                            mt={24}
                            gap={16}
                            justify={'center'}
                            align={'center'}
                            direction={'column'}
                        >
                            <Link to={`/user/${user.userId}/verification`}>
                                <Button color='cyan' variant='subtle'>
                                    Change password
                                </Button>
                            </Link>
                            <Button color='cyan'>Change password</Button>
                        </Flex>
                    </GridCol>
                    <GridCol span={4}>
                        <UserAvatar />
                    </GridCol>
                </Grid>
            </Group>
        </>
    );
}

export default Profile;
