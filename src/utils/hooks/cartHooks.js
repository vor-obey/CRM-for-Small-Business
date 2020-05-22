import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {
    addProductToCart,
    deleteProductFromCart,
    editProductFromCart,
    setProductsToCart
} from "../../data/store/order/orderActions";
import isEqual from 'lodash/isEqual';

export const useCart = (items) => {
    const cartState = useSelector(state => state.orderReducer.cart);
    const dispatch = useDispatch();
    const [products, changeProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);

    useEffect(() => {
        if (items !== undefined && !originalProducts.length) {
            setOriginalProducts([...items]);
        }
    }, [items, originalProducts.length]);

    useEffect(() => {
        if (originalProducts.length === 0) {
            return;
        }

        const isOriginalProductsChanged = () => {
            return products.reduce((prev, curr) => {
                return !!originalProducts.find((product) => {
                    return product.productId === curr.productId
                        && (
                            product.price !== curr.price
                            || product.name !== curr.name
                        );
                }) || prev
            }, false)
        };

        const isCartChanged = () => {
            return cartState.reduce((prev, curr) => {
                return !!products.find((product) => (
                    product.productId === curr.productId
                    && product.amount !== curr.amount
                )) || prev
            }, false) || cartState.length !== products.length;
        };

        const shouldUpdate = isOriginalProductsChanged() || isCartChanged();

        if (shouldUpdate) {

            const newProducts = cartState.map((cartProduct) => {
                const originalProduct = originalProducts.find(
                    (product) => product.productId === cartProduct.productId
                );

                return {
                    ...originalProduct,
                    price: cartProduct.price,
                    totalPrice: cartProduct.amount * cartProduct.price,
                    currency: cartProduct.currency,
                    amount: cartProduct.amount,
                };
            });
            if (!isEqual(products, newProducts)) {
                changeProducts(newProducts);
            }
        }
    }, [cartState, products, originalProducts]);


    const setProducts = useCallback((products) => {
        dispatch(setProductsToCart(products));
    }, [dispatch]);

    return {
        products,
        setProducts,
    };
};

export const useEditCart = () => {
    const cartState = useSelector(state => state.orderReducer.cart);
    const dispatch = useDispatch();

    const deleteProduct = useCallback((product) => {
        const newCart = [...cartState];
        const indexToDelete = newCart.findIndex(({productId}) => productId === product.productId);
        newCart.splice(indexToDelete, 1);

        dispatch(deleteProductFromCart(newCart));
    }, [cartState, dispatch]);

    const addProduct = useCallback((product) => {
        const newCart = [...cartState, product];

        dispatch(addProductToCart(newCart));
    }, [cartState, dispatch]);

    const editProduct = useCallback((product) => {
        const newCart = [...cartState];
        const indexToDelete = newCart.findIndex(({productId}) => productId === product.productId);
        newCart.splice(indexToDelete, 1, product);

        dispatch(editProductFromCart(newCart));
    }, [cartState, dispatch]);

    return {
        deleteProduct,
        addProduct,
        editProduct,
    };
};
