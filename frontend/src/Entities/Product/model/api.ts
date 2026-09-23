import {api} from "../../../Shared/api";
import type { Product } from "./types";

export const productApi = {
    getProducts: async () => {
        return await api.get<Product[]>('/api/products')
    },
    getProductById: async (id: number) => {
        return await api.get<Product>(`/api/product/${id}`)
    }
}