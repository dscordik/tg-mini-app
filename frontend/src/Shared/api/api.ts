const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export const api = {
    post:async<T>(url:string, data:any): Promise<T>=> {
        const token = localStorage.getItem('access_token')

        const headers: Record<string, string> =  {'Content-Type':'application/json', }

        if (token) {
            headers['Authorization'] = 'Bearer ' + token
        }

        const res = await  fetch(`${BASE_URL}${url}`, {
            method:'POST',
            headers: headers,
            body:JSON.stringify(data)
        })
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.detail || 'Ошибка сервера')
        } else {
            return await res.json()
        }
    },
    get:async<T>(url:string): Promise<T> => {
        const token = localStorage.getItem('access_token')

        const headers: Record<string, string> =  {'Content-Type':'application/json', }

        if (token) {
            headers['Authorization'] = 'Bearer ' + token
        }

        const res = await  fetch(`${BASE_URL}${url}`, {
            method:'GET',
            headers: headers
        })
        if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.detail || 'Ошибка сервера')
        } else {
            return await res.json()
        }
    }
}
