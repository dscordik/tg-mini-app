import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../../../Entities/Order';
import type { OrderOut } from '../../../Entities/Order';
import './Orders.css';

export const Orders: React.FC = () => {
    const [orders, setOrders] = useState<OrderOut[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        const handleBack = () => navigate(-1);
        if (tg) {
            tg.BackButton.show();
            tg.BackButton.onClick(handleBack);
        }
        async function fetchOrders() {
            try {
                const data = await orderApi.getMyOrders();
                const sorted = [...data].sort(
                    (a, b) => new Date(b.created_at_order).getTime() - new Date(a.created_at_order).getTime()
                );
                setOrders(sorted);
            } catch (err: any) {
                setError(err.message || 'Не удалось загрузить заказы');
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
        return () => {
            if (tg) {
                tg.BackButton.offClick(handleBack);
                tg.BackButton.hide();
            }
        };
    }, [navigate]);

    function getStatusClass(status: string): string {
        switch (status) {
            case 'Оформляем': return 'orders__status--pending';
            case 'Собираем': return 'orders__status--processing';
            case 'Доставляем': return 'orders__status--shipping';
            case 'Готов к получению': return 'orders__status--ready';
            default: return '';
        }
    }
    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <div className="orders">
            {loading ? (
                <p className="orders__loading">Загрузка заказов...</p>
            ) : error ? (
                <>
                    <p className="orders__error">{error}</p>
                    <button className="orders__button" onClick={() => navigate('/')}>Вернуться в каталог</button>
                </>
            ) : orders.length === 0 ? (
                <div className="orders__empty">
                    <h2 className="orders__title">У вас пока нет заказов</h2>
                    <p>Добавьте товары в корзину и оформите первый заказ!</p>
                    <button className="orders__button" onClick={() => navigate('/')}>Перейти в каталог</button>
                </div>
            ) : (
                <>
                    <h2 className="orders__title">Мои заказы</h2>
                    <ul className="orders__list">
                        {orders.map((order) => (
                            <li key={order.id} className="orders__item">
                                <div className="orders__item-header">
                                    <span className="orders__item-id">Заказ #{order.id}</span>
                                    <span className={`orders__item-status ${getStatusClass(order.status)}`}>
                                    {order.status}
                                </span>
                                </div>
                                <p className="orders__item-date">{formatDate(order.created_at_order)}</p>
                                <p className="orders__item-address">{order.address}</p>
                                <ul className="orders__items-list">
                                    {order.items.map((item) => (
                                        <li key={item.id} className="orders__position">
                                            <span className="orders__position-name">{item.product_name}</span>
                                            <span className="orders__position-details">
                                            {item.total_count} шт. × {item.price.toLocaleString('ru-RU')} ₽
                                        </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="orders__item-total">Итого: <strong>{order.total_price.toLocaleString('ru-RU')} ₽</strong></div>
                            </li>
                        ))}
                    </ul>
                    <button className="orders__button" onClick={() => navigate('/')}>Вернуться в каталог</button>
                </>
            )}
        </div>
    );
};

export default Orders;