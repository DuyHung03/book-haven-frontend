// store.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
    isAuthenticated: boolean;
    role: string | null;
    login: (role: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            role: null,
            login: (role: string) => set({ isAuthenticated: true, role }),
            logout: () => set({ isAuthenticated: false, role: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;
