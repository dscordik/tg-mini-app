import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../Features/cart/model/useCart';
import { productApi } from '../../../Entities/Product';
import { orderApi } from '../../../Entities/Order';
import type { Product } from '../../../Entities/Product';
import type { OrderCreate } from '../../../Entities/Order';
import './Cart.css';

export const Cart: React.FC = () => {
    const { getOrderItems, clearCart, totalCount } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [address, setAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await productApi.getProducts();
                setProducts(data);
            } catch (err) {
                console.error('Не удалось загрузить товары для отображения корзины', err);
            }
        }
        fetchProducts();
    }, []);

    const handleSubmit = async () => {
        if (totalCount === 0) {
            setError('Корзина пуста');
            return;
        }
        if (address.trim() === '') {
            setError('Пожалуйста, введите адрес доставки');
            return;
        }

        setError(null);
        setIsSubmitting(true);

        const orderData: OrderCreate = {
            address: address.trim(),
            items: getOrderItems()
        };

        try {
            await orderApi.createOrder(orderData);
            clearCart();
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Не удалось оформить заказ. Попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPrice = getOrderItems().reduce((sum, item) => {
        const product = products.find(p => p.id === item.product_id);
        return sum + (product ? product.price * item.total_count : 0);
    }, 0);

    return (
        <div className="cart">
            {success ? (
                <div className="cart__success">
                    <h2 className="cart__title">Заказ успешно оформлен! 🎉</h2>
                    <p>Мы уже начали его собирать.</p>
                    <button className="cart__button" onClick={() => navigate('/')}>Вернуться в каталог</button>
                </div>
            ) : totalCount === 0 ? (
                <div className="cart__empty">
                    <h2 className="cart__title">Корзина пуста</h2>
                    <p>Добавьте товары из каталога, чтобы оформить заказ.</p>
                    <button className="cart__button" onClick={() => navigate('/')}>Перейти в каталог</button>
                </div>
            ) : (
                <>
                    <h2 className="cart__title">Ваша корзина</h2>
                    <ul className="cart__list">
                        {getOrderItems().map((item) => {
                            const product = products.find(p => p.id === item.product_id);
                            if (!product) return null
                            return (
                                <li key={item.product_id} className="cart__item">
                                    <div className="cart__item-info">
                                        <span className="cart__item-name">{product.title}</span>
                                        <span className="cart__item-count">{item.total_count} шт.</span>
                                    </div>
                                    <div className="cart__item-price">{(product.price * item.total_count).toLocaleString('ru-RU')} Р</div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="cart__total">Итого: <strong>{totalPrice.toLocaleString('ru-RU')} ₽</strong></div>
                    <div className="cart__form">
                        <input type="text" className="cart__address" placeholder="Введите адрес доставки" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isSubmitting}/>
                        {error && <p className="cart__error">{error}</p>}
                        <button className="cart__button" onClick={handleSubmit} disabled={isSubmitting || address.trim() === ''}>{isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;