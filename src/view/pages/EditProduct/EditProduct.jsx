import React, {useCallback} from 'react';
import {SaveProduct} from '../../components/SaveProduct/SaveProduct';
import {useProductDetailsById} from '../../../utils/hooks/productHooks';
import {useParams} from 'react-router-dom';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import ProductService from '../../../services/ProductService';
import {useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";

export const EditProduct = ({history}) => {
    const {t} = useTranslation();
    const {id} = useParams();
    const [productDetails] = useProductDetailsById(id);
    const dispatch = useDispatch();

    const validateAttributeValues = useCallback((arr) => {
        return arr.find(item => item === '');
    }, []);

    const editProduct = useCallback(async (data) => {
        const {attributesLength, selectedAttributeValues, productDetails, selectedAbstractProduct} = data;
        const attributeValuesEntriesLength = Object.entries(selectedAttributeValues).length;
        if (attributesLength !== attributeValuesEntriesLength) {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Select all values', success: false}));
        } else {
            if (validateAttributeValues(Object.values(selectedAttributeValues)) === undefined) {
                try {
                    dispatch(setIsLoading(true));
                    await ProductService.update({
                        productId: id,
                        abstractProductId: selectedAbstractProduct.abstractProductId,
                        name: productDetails.name,
                        price: productDetails.price,
                        attributeValues: selectedAttributeValues,
                    });
                    dispatch(setIsLoading(false));
                    history.push(`/products/${id}`);
                } catch (e) {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
                }
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: 'Select all values', success: false}));
            }
        }
    }, [
        dispatch,
        history,
        id,
        validateAttributeValues
    ]);

    return (
        <SaveProduct
            product={productDetails}
            labels={{
                title: t('EDIT_PRODUCT'),
                button: t('SAVE')
            }}
            onSave={editProduct}
        />
    );
};
