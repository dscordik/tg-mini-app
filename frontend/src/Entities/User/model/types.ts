export interface User{
    id:number,
    telegram_id:number,
    first_name:string,
    last_name?:string,
    username?:string
}

export interface AuthResponse extends User{
    access_token:string
}