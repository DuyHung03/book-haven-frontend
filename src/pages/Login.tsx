import { Button, Center, Flex, Group, Image, Loader, Text, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import gg_logo from '../assets/gg_logo.svg';
import logo from '../assets/logo_only.png';
import axiosInstance from '../network/httpRequest';
import useUserStore from '../store/useUserStore';
import { setTokenInCookie } from '../util/cookie';
import { tokenVerify } from '../util/tokenVerify';

const Login = () => {
    const { setUser } = useUserStore();
    const navigate = useNavigate();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', password: '' },

        validate: {
            email: isEmail('Invalid email'),
            password: hasLength({ min: 8, max: 20 }, 'Password must have at least 8 letters'),
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
            if (res.data.code === 200) {
                const user = res.data.result.user;
                const jwtToken = res.data.result.jwtToken;

                setTokenInCookie(jwtToken);

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
            form.setFieldError('email', 'Wrong email or password');
            form.setFieldError('password', 'Wrong email or password');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get('accessToken');
        if (token) {
            const tokenDecoded = jwtDecode(token);
            const exp = tokenDecoded?.exp;

            if (tokenVerify(exp)) {
                navigate('/');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            max={20}
                            min={8}
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
                            {loading ? (
                                <Center>
                                    <Loader size={26} />
                                </Center>
                            ) : (
                                <Button type='submit' size=''>
                                    Login
                                </Button>
                            )}
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
