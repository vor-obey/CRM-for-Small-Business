import React, {useCallback} from 'react';
import {SaveProduct} from '../../components/SaveProduct/SaveProduct';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {useDispatch} from 'react-redux';
import ProductService from '../../../services/ProductService';
import {useTranslation} from "react-i18next";
import {setProductDetailsToStore} from "../../../data/store/product/productActions";
import {ORDERS_CREATE, PRODUCTS} from "../../../constants/routes";

export const CreateProduct = ({history}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const createProduct = useCallback(async (data) => {
        const { selectedAttributeValues, productDetails, selectedAbstractProduct, selectedProductType} = data;
        try {
            dispatch(setIsLoading(true));
            const response = await ProductService.create({
                abstractProductId: selectedAbstractProduct?.abstractProductId,
                productTypeId: selectedProductType.productTypeId,
                name: productDetails.name,
                price: productDetails.price,
                attributeValues: selectedAttributeValues,
            });
            dispatch(setIsLoading(false));
            dispatch(setProductDetailsToStore({name: '', price: ''}));
            if (history.location.state !== undefined && !history.location.state.editOrder) {
                history.push(ORDERS_CREATE, {
                     response
                });
            } else {
                history.push(PRODUCTS);
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [
        dispatch,
        history,
    ]);

    return (
        <SaveProduct
            labels={{
                button: t('CREATE'),
                title: t('CREATE_PRODUCT')
            }}
            onSave={createProduct}
            history={history}
        />
    );
};
