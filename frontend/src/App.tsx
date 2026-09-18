import './App.css'
import {useEffect, useState} from "react";

declare global {interface Window{
    Telegram?:any
}}
interface TgUser{
    id:number,
    name:string,
    username?:string
}

function App() {
    const [user, setUser] = useState<TgUser | undefined>(undefined)

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready()
            tg.expand()
            if (tg.initDataUnsafe?.user) {
                setUser(tg.initDataUnsafe.user)
            }
        }

    }, []);

    return (
        <div style={{padding:'20px', textAlign:'center', fontFamily:'sans-serif'}}>
            <h1>Магазин</h1>
            {user ? (<div>
                <p>Привет {user.name}</p>
                <span>{user.id}</span>
            </div>) : (<div>
                <p>Запущено не в телеграмме</p>
            </div>)}
        </div>
    )
}

export default App