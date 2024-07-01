import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
    userId: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    photoUrl: string | null;
}

interface UserStore {
    token: string | null;
    user: User;
    setUser: (newUser: User) => void;
    setToken: (newToken: string) => void;
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
