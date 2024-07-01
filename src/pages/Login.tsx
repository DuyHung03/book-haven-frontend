import { Button, Flex, Group, Image, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gg_logo from '../assets/gg_logo.svg';
import logo from '../assets/logo_only.png';
import axiosInstance from '../network/httpRequest';
import useUserStore from '../store/useUserStore';

const Login = () => {
    const { setUser, setToken } = useUserStore();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', password: '' },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                value.length < 8 ? 'Password must have at least 8 letters' : null,
        },
    });

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);

            const formData = {
                email: form.getValues().email,
                password: form.getValues().password,
            };

            const res = await axiosInstance.post('auth/login', JSON.stringify(formData));
            console.log(res);
            if (res.data.code === 200) {
                const user = res.data.result.user;
                const jwtToken = res.data.result.jwtToken;
                setToken(jwtToken);
                setUser({
                    userId: user.userId,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    photoUrl: user.photoUrl,
                });
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Group p={24} display={'flex'} align='center' justify='center'>
            <Flex justify={'center'} align={'center'} direction={'column'}>
                <Link to={'/'}>
                    <Image src={logo} alt='logo' width={100} />
                </Link>

                <Text fw={600} size={'xl'} lts={1.5} mt={'lg'} c={'cyan'}>
                    PLEASE LOGIN
                </Text>
                <Group mt={30}>
                    <form onSubmit={form.onSubmit(handleLogin)}>
                        <TextInput
                            w={300}
                            size='md'
                            label='Email'
                            placeholder='Email'
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            type='password'
                            size='md'
                            mt='sm'
                            label='Password'
                            placeholder='Password'
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />

                        <Group justify='flex-start' mt='md'>
                            <Link to='/signup'>
                                <Text size='sm' c='cyan' fw='500'>
                                    Forgot password?
                                </Text>
                            </Link>
                        </Group>

                        <Group justify='flex-end' mt='md' grow c='cyan'>
                            <Button type='submit' size='' loading={loading}>
                                Login
                            </Button>
                        </Group>

                        <Group justify='flex-start' mt='md'>
                            <Link to='/signup'>
                                <Text size='xs' c='cyan' fw='500'>
                                    Sign up
                                </Text>
                            </Link>
                        </Group>
                    </form>
                </Group>

                <Text mt='md' mb='md' c={'gray'}>
                    - Or -
                </Text>

                <Button
                    h={36}
                    leftSection={<Image src={gg_logo} alt='' w={24} />}
                    variant='outline'
                    c={'gray'}
                    color='gray'
                    fullWidth
                >
                    Connect with Google
                </Button>
            </Flex>
        </Group>
    );
};

export default Login;
