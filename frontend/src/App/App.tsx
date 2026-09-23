import './App.css'
import {useEffect, useState} from "react";
import {AuthByTg} from "../Features/auth/authByTg";
import type {User} from "../Entities/User";
import {Route, Routes} from "react-router-dom";
import {ProductCatalog} from "../Widget/ProductCatalog";
import {ProductPage} from "../Widget/ProductPage";


function App() {
    const [user, setUser] = useState<User | undefined>(undefined)
    const [cartCount, setCartCount] = useState(0);

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
            </header>
            {user ? (
                <div className="app__user">
                    <p className="app__user-name">Привет, {user.first_name}</p>
                    <span className="app__user-id">{user.telegram_id}</span>
                </div>
            ) : (
                <p className="app__guest">Запущено не в Telegram</p>
            )}
            <Routes>
                <Route path='/' element={<ProductCatalog cartCount={cartCount} handleBuy={() => handleBuy()}/>}></Route>
                <Route path='/product/:id' element={<ProductPage cartCount={cartCount} handleBuy={() => handleBuy()}/>}></Route>
            </Routes>
        </div>
    )
}

export default App