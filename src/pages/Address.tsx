import { Button, Flex, Group, Input, InputWrapper, Select, Text, TextInput } from '@mantine/core';
import { hasLength, isEmail, isNotEmpty, useForm } from '@mantine/form';
import { EditNote, Email, LocationOn, Person, Phone } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddressEntity } from '../entity/AddressEntity';
import { DistrictEntity } from '../entity/DistrictEntity';
import { ProvinceEntity } from '../entity/ProviceEntity';
import { WardEntity } from '../entity/WardEntity';
import axiosInstance from '../network/httpRequest';
import shippingService from '../network/shippingServiceApi';
import useUserStore from '../store/useUserStore';

const Address = () => {
    const { user } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();
    const address: AddressEntity = location.state;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: address.addressId ? address.email : '',
            fullName: address.addressId ? address.fullName : '',
            phone: address.addressId ? address.phone : '',
            address: address.addressId ? address.houseNumber : '',
            province: address.addressId ? address.provinceId.toString() : '',
            provinceName: address.addressId ? address.provinceName : '',
            district: address.addressId ? address.districtId.toString() : '',
            districtName: address.addressId ? address.districtName : '',
            ward: address.addressId ? address.wardCode.toString() : '',
            wardName: address.addressId ? address.wardName : '',
        },
        validate: {
            email: isEmail('Invalid email'),
            fullName: hasLength({ min: 6 }, 'Full name must have at least 6 letters'),
            phone: isNotEmpty('Phone should not be empty'),
            address: isNotEmpty('Address should not be empty'),
            province: isNotEmpty('Province should not be empty'),
            district: isNotEmpty('District should not be empty'),
            ward: isNotEmpty('Ward should not be empty'),
        },
    });

    const [provinces, setProvinces] = useState<ProvinceEntity[]>([]);
    const [districts, setDistricts] = useState<DistrictEntity[]>([]);
    const [wards, setWards] = useState<WardEntity[]>([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const getProvinces = async () => {
            try {
                const res = await shippingService.get('/master-data/province');
                setProvinces(res.data.data);
                console.log(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        getProvinces();
    }, []);

    useEffect(() => {
        const getDistricts = async () => {
            try {
                if (form.getValues().province !== '') {
                    const res = await shippingService.get('/master-data/district', {
                        params: {
                            province_id: form.getValues().province,
                        },
                    });
                    setDistricts(res.data.data);
                    console.log(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getDistricts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.getValues().province]);

    useEffect(() => {
        const getWards = async () => {
            try {
                if (form.getValues().district !== '') {
                    const res = await shippingService.get('/master-data/ward', {
                        params: {
                            district_id: form.getValues().district,
                        },
                    });
                    setWards(res.data.data);
                    console.log(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getWards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.getValues().district]);

    const handleProvinceSelect = (provinceId: string) => {
        form.setFieldValue('province', provinceId);
        const selectedProvince = provinces.find(
            (province) => province.ProvinceID.toString() === provinceId
        );
        if (selectedProvince) {
            form.setFieldValue('provinceName', selectedProvince.ProvinceName);
        }
    };

    const handleDistrictSelect = (districtId: string) => {
        form.setFieldValue('district', districtId);
        const selectedDistrict = districts.find(
            (district) => district.DistrictID.toString() === districtId
        );
        if (selectedDistrict) {
            form.setFieldValue('districtName', selectedDistrict.DistrictName);
        }
    };

    const handleWardSelect = (wardId: string) => {
        form.setFieldValue('ward', wardId);
        const selectedWard = wards.find((ward) => ward.WardCode.toString() === wardId);
        if (selectedWard) {
            form.setFieldValue('wardName', selectedWard.WardName);
        }
    };

    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (form.validate().hasErrors) {
            console.error('Form validation failed');
        } else {
            const res = await axiosInstance.post(
                '/address/save',
                {
                    addressId: address.addressId ? address.addressId : 0,
                    email: form.getValues().email,
                    fullName: form.getValues().fullName,
                    phone: form.getValues().phone,
                    provinceId: parseInt(form.getValues().province),
                    provinceName: form.getValues().provinceName,
                    districtId: parseInt(form.getValues().district),
                    districtName: form.getValues().districtName,
                    wardCode: parseInt(form.getValues().ward),
                    wardName: form.getValues().wardName,
                    houseNumber: form.getValues().address,
                },
                {
                    params: {
                        userId: user.userId,
                    },
                    withCredentials: true,
                }
            );
            console.log(res);
            if (res.data.code == 200) {
                navigate(-1);
            }
        }
    };

    const handleBack = () => {
        if (
            window.confirm(
                'Are you sure you want to leave this page? Unsaved changes will be lost.'
            )
        )
            navigate(-1);
    };

    return (
        <Flex direction={'column'} w={'100%'} justify={'center'} align={'center'} mt={120}>
            <Text fw={500} size='xl'>
                Your address
            </Text>
            <Group mt={'lg'}>
                <form style={{ width: '100%' }} onSubmit={handleSubmitForm}>
                    <Flex direction={'row'} wrap={'wrap'} gap={'sm'}>
                        <TextInput
                            size='md'
                            description='Email'
                            leftSection={<Email fontSize='small' color='disabled' />}
                            placeholder='Email'
                            {...form.getInputProps('email')}
                            style={{ flex: '1 1 45%' }}
                        />
                        <TextInput
                            size='md'
                            leftSection={<Person fontSize='small' color='disabled' />}
                            description='Fullname'
                            placeholder='Fullname'
                            {...form.getInputProps('fullName')}
                            style={{ flex: '1 1 45%' }}
                        />
                    </Flex>
                    <Select
                        mt={'sm'}
                        description='City / Province'
                        size='md'
                        placeholder='Select province'
                        value={form.getValues().province}
                        onChange={(value) => handleProvinceSelect(value || '')}
                        data={provinces.map((province) => ({
                            value: province.ProvinceID.toString(),
                            label: province.NameExtension[1],
                        }))}
                    />
                    <Select
                        mt={'sm'}
                        description='District'
                        size='md'
                        placeholder='Select district'
                        value={form.getValues().district}
                        onChange={(value) => handleDistrictSelect(value || '')}
                        data={districts.map((district) => ({
                            value: district.DistrictID.toString(),
                            label: district.DistrictName,
                        }))}
                    />
                    <Select
                        mt={'sm'}
                        description='Ward'
                        size='md'
                        placeholder='Select ward'
                        value={form.getValues().ward}
                        onChange={(value) => handleWardSelect(value || '')}
                        data={wards.map((ward) => ({
                            value: ward.WardCode.toString(),
                            label: ward.WardName,
                        }))}
                    />
                    <Flex direction={'row'} wrap={'wrap'} gap={'sm'} mt={'sm'}>
                        <InputWrapper description='Phone' size='md' style={{ flex: '1 1 45%' }}>
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
                            size='md'
                            leftSection={<LocationOn fontSize='small' color='disabled' />}
                            description='Address'
                            placeholder='Address'
                            {...form.getInputProps('address')}
                            style={{ flex: '1 1 45%' }}
                        />
                    </Flex>
                    <TextInput
                        size='md'
                        description='Note'
                        leftSection={<EditNote fontSize='small' color='disabled' />}
                        placeholder='Note'
                        {...form.getInputProps('note')}
                        mt='sm'
                    />
                    <Flex direction={'row'} mt={'xl'} justify={'center'}>
                        <Button variant='subtle' mr={24} onClick={handleBack}>
                            Back
                        </Button>
                        <Button color={'cyan'} type='submit'>
                            Save address
                        </Button>
                    </Flex>
                </form>
            </Group>
        </Flex>
    );
};

export default Address;
