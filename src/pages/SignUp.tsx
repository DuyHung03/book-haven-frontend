import {
    Button,
    Center,
    Flex,
    Group,
    Image,
    Input,
    InputWrapper,
    Loader,
    Notification,
    Text,
    TextInput,
} from '@mantine/core';
import { isNotEmpty, matchesField, useForm } from '@mantine/form';
import { Phone } from '@mui/icons-material';
import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { Link, useNavigate } from 'react-router-dom';
import gg_logo from '../assets/gg_logo.svg';
import logo from '../assets/logo_only.png';
import axiosInstance from '../network/httpRequest';
import styles from '../style/SignUp.module.scss';

const SignUp = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', password: '', confirmPassword: '', phone: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                value.length < 8 ? 'Password must have at least 8 characters' : null,
            confirmPassword: matchesField('password', 'Passwords are not the same'),
            phone: isNotEmpty('Phone must not empty'),
        },
    });

    const [loading, setLoading] = useState(false);
    const [showNoti, setShowNoti] = useState(false); // Initialize as false

    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleSignUp = async () => {
        try {
            setLoading(true);
            const formData = {
                email: form.getValues().email,
                password: form.getValues().password,
                phone: form.getValues().phone,
            };
            const res = await axiosInstance.post('auth/register', JSON.stringify(formData));

            console.log(res);

            if (res.data.code === 200) {
                setShowNoti(true); // Show notification
                setTimeout(() => {
                    navigate('/login'); // Navigate to login after 1 second
                }, 1000);
            }
        } catch (error) {
            console.error('SignUp failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            {showNoti && (
                <Notification
                    title='Register Successfully'
                    className={styles.notification}
                    w={300}
                    color='teal'
                />
            )}
            <Group p={24} display={'flex'} align='center' justify='center'>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                    <Link to={'/'}>
                        <Image src={logo} alt='logo' width={100} />
                    </Link>

                    <Text fw={600} size={'xl'} lts={1.5} mt={'lg'} c={'cyan'}>
                        CREATE NEW ACCOUNT
                    </Text>
                    <Group mt={30}>
                        <form onSubmit={form.onSubmit(handleSignUp)}>
                            <TextInput
                                w={300}
                                size='md'
                                label='Email'
                                placeholder='Email'
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />

                            <InputWrapper label='Phone' size='md' mt='sm'>
                                <Input
                                    component={IMaskInput}
                                    mask='0000000000'
                                    placeholder='+84'
                                    size='md'
                                    {...form.getInputProps('phone')}
                                    leftSection={<Phone fontSize='small' color='disabled' />}
                                />
                            </InputWrapper>

                            <TextInput
                                type='password'
                                size='md'
                                mt='sm'
                                label='Password'
                                placeholder='Password'
                                key={form.key('password')}
                                {...form.getInputProps('password')}
                            />

                            <TextInput
                                type='password'
                                size='md'
                                mt='sm'
                                label='Confirm Password'
                                placeholder='Confirm Password'
                                key={form.key('confirmPassword')}
                                {...form.getInputProps('confirmPassword')}
                            />

                            <Group justify='flex-end' mt='md' grow c='cyan'>
                                {loading ? (
                                    <Center>
                                        <Loader size={26} />
                                    </Center>
                                ) : (
                                    <Button type='submit' size=''>
                                        SignUp
                                    </Button>
                                )}
                            </Group>

                            <Group justify='flex-start' mt='md' mb={'md'}>
                                <Link to='/login'>
                                    <Text size='md' c='cyan' fw='500'>
                                        Login
                                    </Text>
                                </Link>
                            </Group>
                        </form>
                    </Group>

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
        </div>
    );
};

export default SignUp;
