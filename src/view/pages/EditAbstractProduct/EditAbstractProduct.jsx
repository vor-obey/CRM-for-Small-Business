import React, {useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {useAbstractProductDetailsById} from '../../../utils/hooks/productHooks';
import {SaveAbstractProduct} from '../../components/SaveAbstractProduct/SaveAbstractProduct';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import AbstractProductService from '../../../services/AbstractProductService';
import {useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";

export const EditAbstractProduct = ({history}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [abstractProduct] = useAbstractProductDetailsById(id);

    const editAbstractProduct = useCallback(async (data) => {
        const {productTypeId, abstractProductDetails} = data;
        try {
            dispatch(setIsLoading(true));
            const response = await AbstractProductService.update({
                abstractProductId: id,
                productTypeId,
                name: abstractProductDetails.name,
                price: abstractProductDetails.price,
                description: abstractProductDetails.description,
            });
            if (response.success) {
                history.push(`/abstract-products/${id}`);
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
            }
        } catch (e) {
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        } finally {
            dispatch(setIsLoading(false));
        }
    }, [dispatch, history, id]);

    return (
        <SaveAbstractProduct
            abstractProduct={abstractProduct}
            labels={{
                title: t('EDIT_CATEGORY_PRODUCT'),
                button: t('EDIT')
            }}
            onSave={editAbstractProduct}
        />
    );

};
