import {
    Box,
    Button,
    Divider,
    Flex,
    Group,
    Input,
    InputWrapper,
    Loader,
    Select,
    Text,
    TextInput,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { Phone } from '@mui/icons-material';
import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../network/httpRequest';
import useUserStore from '../store/useUserStore';
import { validateBirthday } from '../util/utils';

function EditProfile() {
    const { user, setUser } = useUserStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            email: user.email,
            name: user.name,
            phone: user.phone,
            birthday: user.birthday,
            gender: user.gender,
        },
        validate: {
            email: isEmail('Invalid email'),
            phone: isNotEmpty('Phone must not empty'),
            birthday: validateBirthday,
        },
    });

    const handleSubmit = async () => {
        console.log(form.getValues());
        user.name = form.getValues().name;
        user.phone = form.getValues().phone;
        user.birthday = form.getValues().birthday;
        user.gender = form.getValues().gender;
        setLoading(true);
        try {
            const res = await axiosInstance.post(
                '/user/editInfo',
                {
                    userId: user.userId,
                    name: form.getValues().name,
                    phone: form.getValues().phone,
                    birthday: form.getValues().birthday,
                    gender: form.getValues().gender,
                },
                {
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
                setUser(res.data.result);
                navigate(-1);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer toastStyle={{ marginTop: '140px' }} limit={1} />
            <Group p={30} w='50%' m='auto' align='center'>
                <Group gap={1} w={'100%'}>
                    <Text fw={500} size='lg' c={'dark'}>
                        Edit your profile
                    </Text>
                    <Divider w={'100%'} mt={14} />
                </Group>
                <Box w='100%'>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Flex direction={{ base: 'column', md: 'row' }} gap='md'>
                            <TextInput
                                label='Name'
                                placeholder='Name'
                                {...form.getInputProps('name')}
                                mb='md'
                                style={{ flex: 1 }}
                            />
                            <TextInput
                                label='Email'
                                placeholder='Email'
                                required
                                disabled
                                {...form.getInputProps('email')}
                                mb='md'
                                style={{ flex: 1 }}
                            />
                        </Flex>
                        <Flex direction={{ base: 'column', md: 'row' }} gap='md'>
                            <InputWrapper required label='Phone'>
                                <Input
                                    component={IMaskInput}
                                    required
                                    mask='0000000000'
                                    placeholder='+84'
                                    {...form.getInputProps('phone')}
                                    leftSection={<Phone fontSize='small' color='disabled' />}
                                />
                            </InputWrapper>
                            <Select
                                label='Gender'
                                placeholder='Select gender'
                                data={[
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
                                ]}
                                {...form.getInputProps('gender')}
                                mb='md'
                                style={{ flex: 1 }}
                            />
                        </Flex>
                        <InputWrapper label='Birthday'>
                            <Input
                                component={IMaskInput}
                                mask='00/00/0000'
                                placeholder='DD/MM/YYYY'
                                {...form.getInputProps('birthday')}
                            />
                        </InputWrapper>
                        <Group mt='md'>
                            {loading ? <Loader /> : <Button type='submit'>Update Profile</Button>}
                        </Group>
                    </form>
                </Box>
            </Group>
        </>
    );
}

export default EditProfile;
