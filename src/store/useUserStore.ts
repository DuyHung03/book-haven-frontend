import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AddressEntity } from '../entity/AddressEntity';

interface User {
    userId: string | null;
    email: string | null;
    phone: string | null;
    address: AddressEntity | null;
    photoUrl: string | null;
    name: string | null;
    gender: string | null;
    birthday: string | null;
}

interface UserStore {
    user: User;
    setUser: (newUser: User) => void;
    setUserAddress: (address: AddressEntity) => void;
    clearUser: () => void;
    setAvatar: (url: string) => void;
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            token: null,
            user: {
                userId: null,
                email: null,
                phone: null,
                address: null,
                photoUrl: null,
                name: null,
                gender: null,
                birthday: null,
            },
            setUser: (newUser) => set({ user: newUser }),
            setUserAddress: (newAddress) =>
                set((state) => ({
                    user: { ...state.user, address: newAddress },
                })),

            clearUser: () =>
                set({
                    user: {
                        userId: null,
                        email: null,
                        phone: null,
                        address: null,
                        photoUrl: null,
                        name: null,
                        gender: null,
                        birthday: null,
                    },
                }),
            setAvatar: (url: string) =>
                set((state) => ({
                    user: { ...state.user, photoUrl: url },
                })),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserStore;
