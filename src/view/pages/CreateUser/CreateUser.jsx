import React, {useCallback, useEffect, useState} from 'react';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {RoleService, UserService} from "../../../services";
import {useDispatch} from "react-redux";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

export const CreateUser = (props) => {
    const {history} = props;
    const dispatch = useDispatch();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                dispatch(setIsLoading(true));
                const roles = await RoleService.list();
                setRoles(roles);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}))
            }
        };
        fetchRoles();
    }, [dispatch]);

    const onSubmitHandler = useCallback(async (userInput) => {
        const {confirmPassword, ...user} = userInput;
        try {
            dispatch(setIsLoading(true));
            await UserService.create(user);
            dispatch(setIsLoading(false));
            history.push('/users');
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE}))
        }
    }, [dispatch, history]);

    return (
        <SaveUserForm
            onSubmit={onSubmitHandler}
            title="Create User"
            buttonText="Create"
            roles={roles}
            isEdit={false}
        />
    );
};
