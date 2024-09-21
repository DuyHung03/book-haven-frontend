import emailjs from '@emailjs/browser';
import { Button, Center, Divider, Group, Text, TextInput } from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { Done } from '@mui/icons-material';
import { memo, useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../network/httpRequest';
import useUserStore from '../store/useUserStore';
import { generate6DigitCode } from '../util/utils';
const EmailVerify = memo(() => {
    const { user } = useUserStore();
    const [time, setTime] = useState(0);

    const form = useForm({
        initialValues: {
            email: user.email,
            code: '',
        },
        validate: {
            email: isEmail('Invalid email'),
            code: isNotEmpty('Not empty'),
        },
    });

    useEffect(() => {
        if (time > 0) {
            const timerId = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [time]);

    const saveOptToServer = async (code: string) => {
        setTime(60);
        const res = await axiosInstance.post(
            'saveOpt',
            {},
            {
                params: {
                    code: code,
                },
                withCredentials: true,
            }
        );
        if (res.data.code == 200) {
            toast.success('OPT send!');
        } else {
            console.error(res);
        }
    };

    const handleSendCode = useCallback(async () => {
        const code = generate6DigitCode();

        const templateParams = {
            to_email: user.email,
            to_name: user.name ?? user.email,
            code: code,
        };
        emailjs
            .send(
                import.meta.env.VITE_EMAIL_SERVICE_ID,
                import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                templateParams
            )
            .then(
                () => {
                    saveOptToServer(code);
                },
                (error) => {
                    console.log(error);
                }
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.email]);

    const handleVerifyCode = useCallback(async () => {
        try {
            const res = await axiosInstance.post(
                'verification',
                {},
                {
                    params: {
                        code: form.getValues().code,
                        userId: user.userId,
                    },
                    withCredentials: true,
                }
            );
            console.log(res);

            if (res.data.code !== 200) {
                toast.error(res.data.message, {
                    autoClose: 2000,
                });
            } else {
                toast.success(res.data.message);
                window.location.href = res.data.result;
            }
        } catch (error) {
            console.log(error);
        }
    }, [form, user.userId]);

    return (
        <>
            <ToastContainer
                toastStyle={{
                    marginTop: '140px',
                }}
                limit={1}
            />
            <Group p={30} w={'50%'} m={'auto'} align={'center'}>
                <Group gap={1} w={'100%'}>
                    <Text fw={500} size='lg' c={'dark'}>
                        Security Verification
                    </Text>
                    <Text size='md' c={'gray'} w={'100%'}>
                        We will send a one-time code to your Email
                    </Text>
                    <Divider w={'100%'} mt={14} />
                </Group>
                <Group>
                    <form onSubmit={form.onSubmit(handleVerifyCode)}>
                        <TextInput
                            w={300}
                            required
                            label='Email'
                            placeholder='Email'
                            disabled
                            {...form.getInputProps('email')}
                            mb='md'
                        />
                        <TextInput
                            label='Verify code'
                            required
                            placeholder='6 digits'
                            type='number'
                            {...form.getInputProps('code')}
                            mb='md'
                        />
                        {time === 0 ? (
                            <Button
                                color='cyan'
                                mb={12}
                                variant='subtle'
                                onClick={handleSendCode}
                                fullWidth
                            >
                                Send verify code to email
                            </Button>
                        ) : (
                            <>
                                <Button
                                    color='dark'
                                    mb={12}
                                    variant='transparent'
                                    rightSection={<Done color='success' />}
                                    fullWidth
                                >
                                    Verify code sent
                                </Button>
                                <Center>
                                    <Text mb={8} fw={500} c={'cyan'}>
                                        {time} s
                                    </Text>
                                </Center>
                            </>
                        )}
                        <Button type='submit' color='cyan' fullWidth>
                            Verify code
                        </Button>
                    </form>
                </Group>
            </Group>
        </>
    );
});

export default EmailVerify;
