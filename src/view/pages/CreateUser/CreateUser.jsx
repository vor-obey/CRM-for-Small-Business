import React, {useCallback, useEffect, useState} from 'react';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {UserService} from "../../../services";
import {history} from "../../../utils/history";
import {useDispatch} from "react-redux";
import {setIsLoading} from "../../../data/store/auxiliary/auxiliaryActions";

export const CreateUser = () => {
    const dispatch = useDispatch();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            dispatch(setIsLoading(true));
            const roles = await UserService.getRoles();
            setRoles(roles);
            dispatch(setIsLoading(false));
        };
        fetchRoles();
    }, [dispatch]);

    const onSubmitHandler = useCallback( async (userInput) => {
        const {confirmPassword, ...user} = userInput;
        dispatch(setIsLoading(true));
        const response = await UserService.create(user);
        if (response) {
            dispatch(setIsLoading(false));
            history.push('/users');
        } else {
            dispatch(setIsLoading(false));
        }
    }, [dispatch]);

    return (
        <SaveUserForm
            onSubmit={onSubmitHandler}
            titleText="Create User"
            buttonText="Create"
            roles={roles}
            isEdit={false}
        />
    );
};
