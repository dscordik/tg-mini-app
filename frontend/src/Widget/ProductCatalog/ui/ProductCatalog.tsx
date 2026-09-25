import React, {useEffect, useState} from 'react';
import {type Product, productApi} from "../../../Entities/Product";
import {Link} from "react-router-dom";
import './ProductCatalog.css'
import {useCart} from "../../../Features/cart/model/useCart";

export const ProductCatalog:React.FC = () => {
    const {addToCart} = useCart()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [justAddedId, setJustAddedId] = useState<number | null>(null)

    useEffect(() => {
        async function productEffect() {
            try {
                const getProducts = await productApi.getProducts()
                setProducts(getProducts)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        productEffect()
    }, []);

    useEffect(() => {
        if (justAddedId === null) return;
        const timer = setTimeout(() => setJustAddedId(null), 600);
        return () => clearTimeout(timer);
    }, [justAddedId]);

    function handleBuy(productId: number) {
        addToCart(productId);
        setJustAddedId(productId)
        window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred?.('success');
    }

    return (
        <div className="product-catalog">
            {loading ? (
                <p className="product-catalog__loading">Загрузка каталога...</p>
            ) : (
                <div>
                    {products.length === 0 ? (
                        <p className="product-catalog__empty">Товары не добавлены</p>
                    ) : (
                        <div>
                            <div className="product-catalog__list">
                                {products.map((item) => (
                                    <div key={item.id} className="product-catalog__card">
                                        <Link to={`/product/${item.id}`} className="product-catalog__link"><img src={item.image_url} alt={item.title} className="product-catalog__image"/></Link>
                                        <h3 className="product-catalog__title">{item.title}</h3>
                                        <p className="product-catalog__price">{item.price.toLocaleString('ru-RU')} p</p>
                                        <button className={`product-catalog__button${justAddedId === item.id ? ' product-catalog__button--added' : ''}`} onClick={() => handleBuy(item.id)}>
                                            {justAddedId === item.id ? 'Добавлено ✓' : 'В корзину'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductCatalog