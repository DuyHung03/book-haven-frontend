import { Button, Text } from '@mantine/core';
import { Edit } from '@mui/icons-material';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AddressEntity } from '../entity/AddressEntity';
import useUserStore from '../store/useUserStore';

export default memo(function CheckoutAddress({ address }: { address: AddressEntity }) {
    const { user } = useUserStore();
    return (
        <div>
            <Text ml={12} mb={4}>
                <b>Name: </b>
                {address?.fullName}
            </Text>
            <Text ml={12} mb={4}>
                <b>Phone: </b>
                {address?.phone}
            </Text>
            <Text ml={12} mb={4}>
                <b>Address: </b>
                {`${address?.houseNumber}, ${address?.wardName}, ${address?.districtName}, ${address?.provinceName}`}
            </Text>
            <Link to={`/checkout/${user.userId}/address`} state={address}>
                <Button leftSection={<Edit fontSize='small' />} variant='transparent' mt={8}>
                    Edit address
                </Button>
            </Link>
        </div>
    );
});
