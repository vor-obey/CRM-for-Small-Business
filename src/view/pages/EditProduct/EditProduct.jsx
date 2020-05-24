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

    const editProduct = useCallback(async (data) => {
        const {selectedAttributeValues, productDetails, selectedAbstractProduct} = data;
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
    }, [
        dispatch,
        history,
        id,
    ]);

    return (
        <SaveProduct
            history={history}
            product={productDetails}
            labels={{
                title: t('EDIT_PRODUCT'),
                button: t('SAVE')
            }}
            onSave={editProduct}
        />
    );
};
