import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {UserService} from "../../../services";
import {history} from "../../../utils/history";
import {useDispatch} from "react-redux";
import {setIsLoading} from "../../../data/store/auxiliary/auxiliaryActions";

export const EditUser = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                dispatch(setIsLoading(true));
                const [userDetails, roles] = await Promise.all([UserService.findOneById(id), UserService.getRoles()]);
                const {orders, organization, role: {roleId}, ...user} = userDetails;
                setUserDetails({roleId, ...user});
                setRoles(roles);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                //    snackbar
            }
        })()
    }, [id, dispatch]);


    const onSubmitHandler = useCallback(async (userInput) => {
        const {roleId, ...user} = userInput;
        dispatch(setIsLoading(true));
        const response = await UserService.update({userId: id, ...user});
        if (response.success) {
            dispatch(setIsLoading(false));
            history.goBack();
        } else {
            dispatch(setIsLoading(false));
            console.log('error');
        }
    }, [id, dispatch]);


    return (
        <SaveUserForm
            onSubmit={onSubmitHandler}
            titleText="Edit User"
            buttonText="Edit"
            userDetails={userDetails}
            roles={roles}
            isEdit={true}
        />
    );
};
