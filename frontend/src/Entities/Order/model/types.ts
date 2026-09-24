export interface OrderItem {
    product_id: number,
    total_count: number
}

export interface OrderCreate {
    address: string,
    items: OrderItem[]
}

export interface OrderItemOut {
    id: number,
    order_id: number,
    product_id: number,
    product_name: string,
    price: number,
    total_count: number
}

export interface OrderOut {
    id: number,
    user_id: number | null,
    address: string,
    total_price: number,
    status: 'Оформляем' | 'Собираем' | 'Доставляем' | 'Готов к получению',
    created_at_order: string,
    items: OrderItemOut[]
}