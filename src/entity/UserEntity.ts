import { AddressEntity } from './AddressEntity';

export interface User {
    userId: string | null;
    email: string | null;
    phone: string | null;
    address: AddressEntity | null;
    photoUrl: string | null;
    name: string | null;
    gender: string | null;
    birthday: string | null;
}
