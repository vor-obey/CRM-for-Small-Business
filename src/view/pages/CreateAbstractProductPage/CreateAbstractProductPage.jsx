import React, {useCallback} from 'react';
import {SaveAbstractProduct} from '../../components/SaveAbstractProduct/SaveAbstractProduct';
import {useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";
import {PRODUCT_TEMPLATES, PRODUCTS_CREATE} from "../../../constants/routes";
import {createTemplateProduct} from "../../../data/store/product/productActions";

export const CreateAbstractProductPage = ({history}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const onSubmitted = useCallback((abstractProductId) => {
        if (history.location.state?.createOrder) {
            history.push(PRODUCTS_CREATE, {
                createOrder: true,
                abstractProductId
            });
        } else if (history.location.state?.createProduct) {
            history.push(PRODUCTS_CREATE, {
                abstractProductId
            });
        } else {
            history.push(PRODUCT_TEMPLATES);
        }
    },[history]);

    const createAbstractProduct = useCallback(async (data) => {
        dispatch(createTemplateProduct({data, onSubmitted}))
    }, [dispatch, onSubmitted]);

    return (
        <SaveAbstractProduct
            labels={{
                title: t('CREATE_PRODUCT_TEMPLATE'),
                button: t('CREATE')
            }}
            onSave={createAbstractProduct}
        />
    );
};
