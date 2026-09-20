import {api} from "../../../Shared/api";
import type {AuthResponse, User} from "./types";


export const userApi = {
    auth:async (initData:string)=>  {
        return await api.post<AuthResponse>('/api/auth/telegram', {
            init_data:initData
        })
    },
    getMe:async () => {
        return await api.get<User>('/api/me')
    }
}