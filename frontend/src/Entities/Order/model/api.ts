import {api} from "../../../Shared/api";
import type {OrderCreate, OrderOut} from "./types.ts";

export const orderApi = {
    createOrder:async(order:OrderCreate):Promise<OrderOut> => {
        return await api.post<OrderOut>('/api/order/', order)
    },
    getMyOrders:async():Promise<OrderOut[]> => {
        return await api.get<OrderOut[]>('/api/order/me')
    }
}