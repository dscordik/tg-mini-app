import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../Features/cart/model/useCart';
import type { User } from '../../../Entities/User';
import './Header.css';

interface HeaderProps {
    user?: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
    const { totalCount } = useCart();

    return (
        <>
            <header className="header">
                <h1 className="header__title">Магазин</h1>
                <Link to="/cart" className="header__cart"> {totalCount}</Link>
            </header>

            {user ? (
                <div className="header__user">
                    <p className="header__user-name">Привет, {user.first_name}</p>
                    <span className="header__user-id">{user.telegram_id}</span>
                    <Link to="/orders" className="header__orders-link">Мои заказы</Link>
                </div>
            ) : (
                <p className="header__guest">Запущено не в Telegram</p>
            )}
        </>
    );
};

export default Header;