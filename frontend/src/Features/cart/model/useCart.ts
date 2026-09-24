import { useState, useEffect, useMemo } from 'react';

export function useCart() {
    const [cart, setCart] = useState<Record<number, number>>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addToCart(productId: number){
        if (!cart[productId]){
            setCart({...cart,[productId]:1})
        } else {
            setCart({...cart,[productId]:cart[productId] + 1})
        }
    }
    function removeFromCart(productId: number){
        if (!cart[productId]) return
        if (cart[productId] === 1){
            const{[productId]:product, ...rest} = cart
            setCart(rest)
        }else {
            setCart({...cart,[productId]:cart[productId]-1})
        }
    }
    function clearCart  () {
        setCart({})
    }

    const totalCount = useMemo(() => {
        return Object.values(cart).reduce((sum, count) => sum + count, 0);
    }, [cart]);

    function getOrderItems (){
        return Object.entries(cart).map(([productId, total_count]) => ({
            product_id: Number(productId),
            total_count
        }));
    }

    return { cart, addToCart, removeFromCart, clearCart, totalCount, getOrderItems };
}