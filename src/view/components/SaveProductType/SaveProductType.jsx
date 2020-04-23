import React, {useCallback, useState} from 'react';
import {SaveProductTypeForm} from '../SaveProductTypeForm/SaveProductTypeForm';
import {ProductTypeService} from '../../../services';

export const SaveProductType = ({
                                    labels,
                                    updateProductTypes,
                                    productType,
                                    isEdit
                                }) => {
    const [productTypeDetails, setProductType] = useState({
        name: (productType && productType.name) || '',
        description: (productType && productType.description) || ''
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
            labels={labels}
            productTypeDetails={productTypeDetails}
            onChange={onChangedInputHandler}
            onSubmit={submit}
        />
    );
};