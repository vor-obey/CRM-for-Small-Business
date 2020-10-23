import React, {useCallback} from 'react';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useRolesState} from '../../../utils/hooks/userHooks';
import {createUser} from "../../../data/store/user/userActions";

export const CreateUser = () => {
    const dispatch = useDispatch();
    const {roles} = useRolesState()
    const { t } = useTranslation('');

    const onSubmit = useCallback((userInput) => {
        dispatch(createUser(userInput))
    }, [dispatch])

    return (
        <SaveUserForm
            onSubmit={onSubmit}
            title={t('CREATE_USER')}
            buttonText={t('CREATE')}
            roles={roles}
            isEdit={false}
        />
    );
};
