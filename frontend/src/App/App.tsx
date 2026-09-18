import './App.css'
import {useEffect, useState} from "react";
import type {TgUser} from "../Shared/lib/telegram";
import {products} from "../Entities/Product/model/product";

function App() {
    const [user, setUser] = useState<TgUser | undefined>(undefined)
    const [cartCount, setCartCount] = useState<number>(0)

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

    function handleBuy() {
        setCartCount(prev => prev + 1)
        window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred?.('success')
    }

    return (
        <div style={{padding:'20px', textAlign:'center', fontFamily:'sans-serif'}}>
            <h1>Магазин {cartCount}</h1>
            {user ? (<div>
                <p>Привет {user.name}</p>
                <span>{user.id}</span>
            </div>) : (<div>
                <p>Запущено не в телеграмме</p>
            </div>)}
            {products.map((item) => (
                <div key={item.id}>
                    <img src={item.imageUrl} alt={item.name}/>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <button onClick={() => handleBuy()}>Добавить в корзину</button>
                </div>
            ))}
        </div>
    )
}

export default App