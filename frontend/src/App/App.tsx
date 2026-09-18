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
        <div className="app">
            <header className="app__header">
                <h1 className="app__title">Магазин</h1>
                <div className="app__cart">🛒 {cartCount}</div>
            </header>
            {user ? (
                <div className="app__user">
                    <p className="app__user-name">Привет, {user.name}</p>
                    <span className="app__user-id">{user.id}</span>
                </div>
            ) : (
                <p className="app__guest">Запущено не в Telegram</p>
            )}
            <div className="app__list">
                {products.map((item) => (
                    <div key={item.id} className="app__card">
                        <img className="app__image" src={item.imageUrl} alt={item.name}/>
                        <span className="app__name">{item.name}</span>
                        <span className="app__price">{item.price} ₽</span>
                        <button className="app__button" onClick={handleBuy}>
                            Добавить в корзину
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App