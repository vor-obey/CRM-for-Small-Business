import CustomerService from '../../../services/CustomerService';
import {
    getCitySuggestionsFailure,
    getCitySuggestionsSuccess, getWarehouseSuggestionsFailure, getWarehouseSuggestionsSuccess,
    setIsCitySuggestionsLoading,
    setIsWarehouseSuggestionsLoading
} from "./autocompleteActions";

export const getCitySuggestions = value => async (dispatch) => {
    try {
        dispatch(setIsCitySuggestionsLoading(true));
        const response = await CustomerService.getNovaPoshtaCities(value);
        dispatch(setIsCitySuggestionsLoading(false));
        if (response.success && response.data.length) {
            dispatch(getCitySuggestionsSuccess(response.data))
        }
        if (!response.success || !response.data.length) {
            dispatch(getCitySuggestionsFailure('No suggestions'))
        }
    } catch (e) {
        dispatch(getCitySuggestionsFailure(e.message));
    }
};

export const getWarehouseSuggestions = value => async (dispatch) => {
    try {
        dispatch(setIsWarehouseSuggestionsLoading(true));
        const response = await CustomerService.getNovaPoshtaCities(value);
        dispatch(setIsWarehouseSuggestionsLoading(false));
        if (response.success && response.data.length) {
            dispatch(getWarehouseSuggestionsSuccess(response.data))
        }
        if (!response.success || !response.data.length) {
            dispatch(getWarehouseSuggestionsFailure('No suggestions'))
        }
    } catch (e) {
        dispatch(getWarehouseSuggestionsFailure(e.message));
    }
};