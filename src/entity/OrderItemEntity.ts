import { CartItemEntity } from './CartItemEntity';

export interface OrderEntity {
    orderId: string;
    orderDate: string;
    totalAmount: string;
    orderItems: CartItemEntity[];
}
