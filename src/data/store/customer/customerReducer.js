import {ADD_CUSTOMER_DETAIL} from "./customerActionTypes";

const initialState = {
    details: {
        username: '',
        name: '',
        contactNumber: '',
        contactEmail: '',
        details: '',
        sourceId: '',
    }
};

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CUSTOMER_DETAIL: {
            return {
                ...state,
                details: {
                    ...state.details,
                    ...action.detail
                }
            }
        }
        default: {
            return state
        }
    }
};
