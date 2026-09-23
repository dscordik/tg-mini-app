import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {type Product, productApi} from "../../../Entities/Product";
import './ProductPage.css'

interface ProductPageProps{
    cartCount:number,
    handleBuy:()=>void
}

export const ProductPage:React.FC<ProductPageProps> = ({cartCount, handleBuy}) => {
    const {id} = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        const handleBack = () => navigate(-1)
        if (tg) {
            tg.BackButton.show()
            tg.BackButton.onClick(handleBack)
        }
        async function getProduct() {
            if (!id) {
                console.error('ID товара не указан');
                setLoading(false);
                return;
            }
            try {
                const productFromApi = await productApi.getProductById(Number(id))
                setProduct(productFromApi)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        getProduct()
        return () => {
            if (tg) {
                tg.BackButton.offClick(handleBack)
                tg.BackButton.hide()
            }
        }
    }, [id, navigate]);

    return (
        <div className="product-page">
            {loading ? (
                <p className="product-page__loading">Загрузка товара...</p>
            ) : (
                <div>
                    {!product ? (
                        <p className="product-page__not-found">Товар не найден</p>
                    ) : (
                        <div className="product-page__content">
                            <div className="product-page__counter">🛒 {cartCount}</div>
                            <img src={product.image_url} alt={product.title} className="product-page__image"/>
                            <h1 className="product-page__title">{product.title}</h1>
                            <p className="product-page__category">{product.category}</p>
                            <p className="product-page__price">{product.price.toLocaleString('ru-RU')} ₽</p>
                            <p className="product-page__description">{product.description}</p>
                            <button className="product-page__button" onClick={handleBuy}>В корзину</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductPage