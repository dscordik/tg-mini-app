import {userApi} from "../../../../Entities/User";

export async function AuthByTg(initData:string) {
    try {
        const data = await userApi.auth(initData)
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data))
        return data
    }catch (error) {
        throw error
    }
}