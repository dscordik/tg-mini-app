declare global {
    interface Window{
        Telegram?:any
    }
}
export interface TgUser{
    id:number,
    name:string,
    username?:string
}