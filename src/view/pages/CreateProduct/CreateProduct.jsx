import React, {useCallback} from 'react';
import {SaveProduct} from '../../components/SaveProduct/SaveProduct';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {useDispatch} from 'react-redux';
import ProductService from '../../../services/ProductService';
import {useTranslation} from "react-i18next";

export const CreateProduct = ({history}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const createProduct = useCallback(async (data) => {
        const {selectedAttributeValues, productDetails, selectedAbstractProduct} = data;
        try {
            dispatch(setIsLoading(true));
            await ProductService.create({
                abstractProductId: selectedAbstractProduct.abstractProductId,
                name: productDetails.name,
                price: productDetails.price,
                attributeValues: selectedAttributeValues,
            });
            dispatch(setIsLoading(false));
            history.push('/products');
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
        />
    );
};
