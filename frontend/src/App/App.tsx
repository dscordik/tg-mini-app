import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthByTg } from '../Features/auth/authByTg';
import type { User } from '../Entities/User';
import { ProductCatalog } from '../Widget/ProductCatalog';
import { ProductPage } from '../Widget/ProductPage';
import { Cart } from '../Widget/Cart';
import { Orders } from '../Widget/Orders';
import { Header } from '../Widget/Header';

function App() {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
            tg.ready();
            tg.expand();
            const initData = tg.initData;
            if (initData) {
                AuthByTg(initData)
                    .then(data => setUser(data))
                    .catch(err => console.error(err));
            }
        }
    }, []);

    return (
        <div className="app">
            <Header user={user} />
            <Routes>
                <Route path='/' element={<ProductCatalog />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/orders' element={<Orders />} />
            </Routes>
        </div>
    );
}

export default App;