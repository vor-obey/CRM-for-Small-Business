import React, {useCallback, useState} from 'react';
import {SaveProductTypeForm} from '../../components/SaveProductTypeForm/SaveProductTypeForm';
import {ProductTypeService} from '../../../services';

export const CreateProductType = ({
                                      updateProductTypes
                                  }) => {
    const [productType, setProductType] = useState({
        name: '',
        description: ''
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
        const res = await ProductTypeService.create(productType);
        if (typeof updateProductTypes === 'function') {
            updateProductTypes(res);
        }
    }, [productType, updateProductTypes]);

    return (
        <SaveProductTypeForm
            productType={productType}
            onChange={onChangedInputHandler}
            onSubmit={submit}
        />
    );
};