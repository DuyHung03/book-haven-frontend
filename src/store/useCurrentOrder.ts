import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CartItemEntity } from '../entity/CartItemEntity';

interface CurrentOrderStore {
    totalAmount: number;
    orderItems: CartItemEntity[];
    isSaved: boolean;
    setCurrentOrderItems: (orderItems: CartItemEntity[]) => void;
    setTotalAmount: (total: number) => void;
    setIsSaved: (value: boolean) => void;
    clearCurrentOrder: () => void;
}

const useCurrentOrderStore = create<CurrentOrderStore>()(
    persist(
        (set) => ({
            orderItems: [],
            totalAmount: 0,
            isSaved: false,
            setIsSaved: (value) => set({ isSaved: value }),
            setCurrentOrderItems: (newOrderItems) => set({ orderItems: newOrderItems }),
            setTotalAmount: (total) =>
                set({
                    totalAmount: total,
                }),
            clearCurrentOrder: () =>
                set({
                    orderItems: [],
                    totalAmount: 0,
                    isSaved: false,
                }),
        }),
        {
            name: 'current-order-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCurrentOrderStore;
