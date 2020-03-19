import React, {useCallback, useEffect, useState} from 'react';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {RoleService, UserService} from "../../../services";
import {useDispatch} from "react-redux";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import {useTranslation} from "react-i18next";

export const CreateUser = ({history}) => {
    const dispatch = useDispatch();
    const [roles, setRoles] = useState([]);
    const { t } = useTranslation('');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                dispatch(setIsLoading(true));
                const roles = await RoleService.list();
                setRoles(roles);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchRoles();
    }, [dispatch]);

    const onSubmitHandler = useCallback(async (userInput) => {
        const {confirmPassword, ...user} = userInput;
        try {
            dispatch(setIsLoading(true));
            const response = await UserService.create(user);
            if (response) {
                dispatch(setIsLoading(false));
                history.push('/users');
            }
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
        }
    }, [dispatch, history]);

    return (
        <SaveUserForm
            onSubmit={onSubmitHandler}
            title={t('CREATE_USER')}
            buttonText={t('CREATE')}
            roles={roles}
            isEdit={false}
        />
    );
};
