import React, {useCallback} from 'react';
import {SaveProduct} from '../../components/SaveProduct/SaveProduct';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';
import {useDispatch} from 'react-redux';
import ProductService from '../../../services/ProductService';
import {useLastLocation} from 'react-router-last-location';

export const CreateProduct = ({history}) => {
    const dispatch = useDispatch();
    const lastLocation = useLastLocation();

    const validateAttributeValues = useCallback((arr) => {
        return arr.find(item => item === '');
    }, []);

    const createProduct = useCallback(async (data) => {
        const {attributesLength, selectedAttributeValues, productDetails, selectedAbstractProduct} = data;
        const attributeValuesEntriesLength = Object.entries(selectedAttributeValues).length;
        if (attributesLength !== attributeValuesEntriesLength) {
            dispatch(setSnackBarStatus({isOpen: true, message: 'Select all values', success: false}));
        } else {
            if (validateAttributeValues(Object.values(selectedAttributeValues)) === undefined) {
                try {
                    dispatch(setIsLoading(true));
                    await ProductService.create({
                        abstractProductId: selectedAbstractProduct.abstractProductId,
                        name: productDetails.name,
                        price: productDetails.price,
                        attributeValues: selectedAttributeValues,
                    });
                    dispatch(setIsLoading(false));
                    history.push(`${lastLocation ? lastLocation.pathname : '/products'}`);
                } catch (e) {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
                }
            } else {
                dispatch(setSnackBarStatus({isOpen: true, message: 'Select all values', success: false}));
            }
        }
    }, [
        validateAttributeValues,
        dispatch,
        history,
        lastLocation
    ]);

    return (
        <SaveProduct
            history={history}
            labels={{
                title: 'Create product',
                button: 'Create'
            }}
            onSave={createProduct}
        />
    );
};