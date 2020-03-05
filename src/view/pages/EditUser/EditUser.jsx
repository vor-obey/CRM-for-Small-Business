import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {RoleService, UserService} from "../../../services";
import {history} from "../../../utils/history";
import {useDispatch, useSelector} from "react-redux";
import {setSnackBarStatus, setIsLoading} from "../../../data/store/auxiliary/auxiliaryActions";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

export const EditUser = () => {
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const {id} = useParams();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setIsLoading(true));
                const [userDetails, roles] = await Promise.all([UserService.findOneById(id), RoleService.list()]);
                const {orders, organization, role: {roleId}, ...user} = userDetails;
                setUserDetails({roleId, ...user});
                setRoles(roles);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}))
            }
        };
        fetchData();
    }, [id, dispatch]);


    const onSubmitHandler = useCallback(async (userInput) => {
        const {roleId, ...user} = userInput;
        dispatch(setIsLoading(true));
        const response = await UserService.update({userId: id, ...user, roleId});
        if (response.success) {
            dispatch(setIsLoading(false));
            history.goBack();
        } else {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
        }
    }, [id, dispatch]);


    return (
        <SaveUserForm
            currentUser={currentUser}
            onSubmit={onSubmitHandler}
            title="Edit User"
            buttonText="Edit"
            userDetails={userDetails}
            roles={roles}
            isEdit={true}
        />
    );
};
