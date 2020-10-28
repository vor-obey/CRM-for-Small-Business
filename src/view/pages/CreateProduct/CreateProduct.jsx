import React, {useCallback} from 'react';
import {SaveProduct} from '../../components/SaveProduct/SaveProduct';
import {useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";
import {createProduct} from "../../../data/store/product/productActions";


export const CreateProduct = ({history}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const onCreateProduct = useCallback(async (data) => {
        dispatch(createProduct({data, history}));
    }, [dispatch, history,]);

    return (
        <SaveProduct
            labels={{
                button: t('CREATE'),
                title: t('CREATE_PRODUCT')
            }}
            onSave={onCreateProduct}
            history={history}
        />
    );
};
