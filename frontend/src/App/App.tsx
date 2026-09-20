import './App.css'
import {useEffect, useState} from "react";
import {products} from "../Entities/Product/model/product";
import {AuthByTg} from "../Features/auth/authByTg";
import type {User} from "../Entities/User";


function App() {
    const [user, setUser] = useState<User | undefined>(undefined)
    const [cartCount, setCartCount] = useState<number>(0)

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready()
            tg.expand()
            const initData = tg.initData
            if (initData) {
                AuthByTg(initData)
                    .then(data => setUser(data))
                    .catch(err => console.error(err))
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
                    <p className="app__user-name">Привет, {user.first_name}</p>
                    <span className="app__user-id">{user.telegram_id}</span>
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