import { Button, Divider, Group, Text, TextInput } from '@mantine/core';
import { matchesField, useForm } from '@mantine/form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../network/httpRequest';

const ChangePassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: {
            password: (value) =>
                value.length < 8 ? 'Password must have at least 8 characters' : null,
            confirmPassword: matchesField('password', 'Passwords are not the same'),
        },
    });

    const handleChangePassword = async () => {
        const res = await axiosInstance.post(
            '/reset-password',
            {},
            {
                params: {
                    token: token,
                    newPassword: form.getValues().password,
                },
                withCredentials: true,
            }
        );
        if (res.data.code == 200) {
            toast.success(res.data.result);
            navigate(-2);
        } else {
            toast.error(res.data.result);
        }
    };

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
                        Change Password
                    </Text>
                    <Text size='md' c={'gray'} w={'100%'}>
                        Please enter your new password below.
                    </Text>
                    <Divider w={'100%'} mt={14} />
                </Group>
                <Group>
                    <form onSubmit={form.onSubmit(handleChangePassword)}>
                        <TextInput
                            w={300}
                            required
                            label='New password'
                            placeholder='At least 8 characters'
                            type='password'
                            {...form.getInputProps('password')}
                            mb='md'
                        />
                        <TextInput
                            label='Confirm password'
                            required
                            placeholder='Confirm password'
                            type='password'
                            {...form.getInputProps('confirmPassword')}
                            mb='md'
                        />

                        <Button color='cyan' type='submit' mb={12} fullWidth>
                            Change password
                        </Button>
                    </form>
                </Group>
            </Group>
        </>
    );
};

export default ChangePassword;
