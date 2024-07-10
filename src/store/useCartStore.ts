import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CartItemEntity } from '../entity/CartItemEntity';

interface CartStore {
    cartItems: CartItemEntity[];
    setCartItem: (newCartItems: CartItemEntity[]) => void;
}

const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cartItems: [],
            setCartItem: (newCartItems) => set({ cartItems: newCartItems }),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCartStore;
