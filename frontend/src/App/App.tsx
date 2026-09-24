import './App.css'
import {useEffect, useState} from "react";
import {AuthByTg} from "../Features/auth/authByTg";
import type {User} from "../Entities/User";
import {Link, Route, Routes} from "react-router-dom";
import {ProductCatalog} from "../Widget/ProductCatalog";
import {ProductPage} from "../Widget/ProductPage";
import {useCart} from "../Features/cart/model/useCart";
import {Cart} from "../Widget/Cart";
import {Orders} from "../Widget/Orders";


function App() {
    const {totalCount} = useCart();
    const [user, setUser] = useState<User | undefined>(undefined)

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

    return (
        <div className="app">
            <header className="app__header">
                <h1 className="app__title">Магазин</h1>
                <Link to="/cart" className="app__cart"> {totalCount}</Link>
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
                <Route path='/' element={<ProductCatalog/>}></Route>
                <Route path='/product/:id' element={<ProductPage/>}></Route>
                <Route path='/cart' element={<Cart />} />
                <Route path='/orders' element={<Orders />} />
            </Routes>
        </div>
    )
}

export default App