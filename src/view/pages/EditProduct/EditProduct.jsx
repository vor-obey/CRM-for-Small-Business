import React, {useCallback} from 'react';
import {SaveProduct} from '../../components/SaveProduct/SaveProduct';
import {useProductDetailsById} from '../../../utils/hooks/productHooks';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";
import {editProduct} from "../../../data/store/product/productActions";


export const EditProduct = ({history}) => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {productDetails} = useProductDetailsById(id);
    const dispatch = useDispatch();

    const onEditProduct = useCallback(async (data) => {
      dispatch(editProduct({id, data, history}))
    }, [dispatch, id, history]);

    return (
        <SaveProduct
            history={history}
            product={productDetails}
            labels={{
                title: t('EDIT_PRODUCT'),
                button: t('SAVE')
            }}
            onSave={onEditProduct}
            isEdit={true}
        />
    );
};
