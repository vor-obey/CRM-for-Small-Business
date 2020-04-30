import React, {useCallback, useState} from 'react';
import {SaveProductTypeForm} from '../SaveProductTypeForm/SaveProductTypeForm';
import {ProductTypeService} from '../../../services';

export const SaveProductType = ({
                                    t,
                                    labels,
                                    updateProductTypes,
                                    productType,
                                    isEdit
                                }) => {
    const [productTypeDetails, setProductType] = useState({
        name: (productType && productType.name) || ''
    });

    const onChangedInputHandler = useCallback((event) => {
        const {name, value} = event.target;
        setProductType(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }, []);

    const submit = useCallback(async () => {
        let res;
        if (isEdit) {
            res = await ProductTypeService.update({productTypeId: productType.productTypeId, ...productTypeDetails});
        } else {
            res = await ProductTypeService.create(productTypeDetails);
        }
        if (typeof updateProductTypes === 'function') {
            updateProductTypes(res);
        }
    }, [productTypeDetails, updateProductTypes, isEdit, productType]);

    return (
        <SaveProductTypeForm
            t={t}
            labels={labels}
            productTypeDetails={productTypeDetails}
            onChange={onChangedInputHandler}
            onSubmit={submit}
        />
    );
};
