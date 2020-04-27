import React, {useCallback, useState} from 'react';
import {SaveAttributeForm} from '../../components/SaveAttributeForm/SaveAttributeForm';
import {AttributeService} from '../../../services';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../../data/store/auxiliary/auxiliaryActions';

export const CreateAttribute = ({
                                    t,
                                    productTypeId,
                                    updateAttributes,
                                }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [valuesToSave, setValuesToSave] = useState([]);

    const onChange = useCallback((event) => {
        setName(event.target.value);
    }, []);

    const onSubmit = useCallback(async () => {
        try {
            dispatch(setIsLoading(true));
            await AttributeService.create({
                productTypeId,
                name,
                values: valuesToSave
            });
            updateAttributes();
            dispatch(setIsLoading(false));
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
        }
    }, [productTypeId, name, valuesToSave, dispatch, updateAttributes]);

    const addAttributeValue = useCallback((value) => {
        setValuesToSave(prevState => [...prevState, value]);
    }, []);

    const removeAttributeValue = useCallback((index) => {
        setValuesToSave(prevState => {
            return prevState.filter((item, i) => i !== index);
        });
    }, []);

    return (
        <SaveAttributeForm
            t={t}
            name={name}
            onChange={onChange}
            onSubmit={onSubmit}
            addAttributeValue={addAttributeValue}
            removeAttributeValue={removeAttributeValue}
            attrValues={valuesToSave}
        />
    );
};
