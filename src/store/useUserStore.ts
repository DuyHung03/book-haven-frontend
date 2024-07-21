import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AddressEntity } from '../entity/AddressEntity';

interface User {
    userId: string | null;
    email: string | null;
    phone: string | null;
    address: AddressEntity | null;
    photoUrl: string | null;
}

interface UserStore {
    token: string | null;
    user: User;
    setUser: (newUser: User) => void;
    setToken: (newToken: string) => void;
    setUserAddress: (address: AddressEntity) => void;
    clearUser: () => void;
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
            },
            setUser: (newUser) => set({ user: newUser }),
            setToken: (newToken) => set({ token: newToken }),
            setUserAddress: (newAddress) =>
                set((state) => ({
                    user: { ...state.user, address: newAddress },
                })),
            clearUser: () =>
                set({
                    token: null,
                    user: {
                        userId: null,
                        email: null,
                        phone: null,
                        address: null,
                        photoUrl: null,
                    },
                }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserStore;
