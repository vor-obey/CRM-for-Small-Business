import React, {useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {useAbstractProductDetailsById} from '../../../utils/hooks/productHooks';
import {SaveAbstractProduct} from '../../components/SaveAbstractProduct/SaveAbstractProduct';
import {useDispatch} from 'react-redux';
import {useTranslation} from "react-i18next";
import {PRODUCT_TEMPLATES} from "../../../constants/routes";
import {editTemplateProduct} from "../../../data/store/product/productActions";

export const EditAbstractProduct = ({history}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const {abstractProductDetails} = useAbstractProductDetailsById(id);

    const editAbstractProduct = useCallback(async (data) => {
        const onEditSuccessfully = () => {
            history.push(`${PRODUCT_TEMPLATES}/${id}`);
        }

        dispatch(editTemplateProduct({id, onEditSuccessfully, data}));
    }, [dispatch, history, id]);

    return (
        <SaveAbstractProduct
            abstractProduct={abstractProductDetails}
            labels={{
                title: t('EDIT_CATEGORY_PRODUCT'),
                button: t('SAVE')
            }}
            onSave={editAbstractProduct}
        />
    );

};
