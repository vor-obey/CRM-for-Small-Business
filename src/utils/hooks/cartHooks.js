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
    const dispatch = useDispatch();
    const [products, changeProducts] = useState([]);

    useEffect(() => {
        const isCartChanged = () => {
            return cartState.reduce((prev, curr) => {
                return !!products.find((product) => (
                    product.productId === curr.productId
                    && product.amount !== curr.amount
                )) || prev
            }, false) || cartState.length !== products.length;
        };

        const shouldUpdate = isCartChanged();

        if (shouldUpdate) {

            const newProducts = cartState.map((cartProduct) => {
                 return {
                    productId: cartProduct.productId,
                    name: cartProduct.name,
                    price: cartProduct.price,
                    totalPrice: cartProduct.amount * cartProduct.price ,
                    currency: cartProduct.currency,
                    amount: cartProduct.amount,
                };
            });
            changeProducts(newProducts);
        }
    }, [cartState, products]);


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
