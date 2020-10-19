import React, {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useManagerById, useRolesState} from "../../../utils/hooks/userHooks";
import {cleanUserDetails, updateUser} from "../../../data/store/user/userActions";

export const EditUser = () => {
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const {id} = useParams();
    const dispatch = useDispatch();
    const { t } = useTranslation('');
    const { roles } = useRolesState();
    const { userDetails } = useManagerById(id);

    useEffect(() => {
        return () => {
            dispatch(cleanUserDetails())
        }
    }, [dispatch])

    const onSubmit = useCallback((userInput) => {
        dispatch(updateUser(userInput, id))
    }, [dispatch, id])

    return (
        <SaveUserForm
            currentUser={currentUser}
            onSubmit={onSubmit}
            title={t('EDIT_USER')}
            buttonText={t('SAVE')}
            userDetails={userDetails}
            roles={roles}
            isEdit={true}
        />
    );
};
