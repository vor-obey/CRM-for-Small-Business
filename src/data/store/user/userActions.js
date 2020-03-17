import {
    GET_CURRENT_USER_SUCCESS,
} from "./userActionTypes";

export const setCurrentUser = (currentUser) => {
    return {
        type: GET_CURRENT_USER_SUCCESS,
        currentUser
    }
};