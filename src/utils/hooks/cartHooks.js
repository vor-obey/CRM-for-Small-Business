import {useProducts} from './productHooks';
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {
    addProductToCart,
    deleteProductFromCart,
    editProductFromCart,
    setProductsToCart
} from "../../data/store/order/orderActions";

export const useCart = () => {
    const cartState = useSelector(state => state.orderReducer.cart);
    const [originalProducts] = useProducts();
    const dispatch = useDispatch();
    const [products, changeProducts] = useState([]);

    useEffect(() => {
        if (originalProducts.length === 0) {
            return;
        }

        const isOriginalProductsChanged = () => {
            return products.reduce((prev, curr) => {
                return !!originalProducts.find((product) => (
                    product.productId === curr.productId
                    && (
                        product.price !== curr.price
                        || product.name !== curr.name
                    )
                )) || prev
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
                    totalPrice: cartProduct.amount * originalProduct.price,
                    currency: cartProduct.currency,
                    amount: cartProduct.amount,
                };
            });
            changeProducts(newProducts);
        }
    }, [originalProducts, cartState, products]);


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
