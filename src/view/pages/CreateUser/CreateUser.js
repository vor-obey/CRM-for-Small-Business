import React, {useCallback} from 'react';
import { postUser} from "../../../data/store/user/userThunkAction";
import { useDispatch } from "react-redux";
import {SaveUserForm} from '../../components/Form/SaveUserForm/SaveUserForm';


export const CreateUser = (props) => {

    const dispatch = useDispatch();

    const onSubmitHandler = useCallback((userInput) => {
        const {
            confirmPassword,
            ...user
        } = userInput;
        const { history } = props;
        if (user.password === confirmPassword && user.firstName.length > 2 && user.lastName.length > 2 && user.middleName.length > 2 && user.password.length > 5) {
            dispatch(postUser(user));
            history.push('/users');
        }
    }, [dispatch, props]);

    return (
        <div>
            <SaveUserForm
                titleText="Create user"
                onSubmit={onSubmitHandler}
                submitButton="Add new user"
                isEdit={true}
            />
        </div>
    );
};
