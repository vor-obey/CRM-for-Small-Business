import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import { editUser, loadUser } from "../../../data/store/user/userThunkAction";
import {useParams} from 'react-router-dom';
import {SaveUserForm} from '../../components/Form/SaveUserForm/SaveUserForm';
import {UserService} from "../../../services";


export const EditUser = (props) => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchUserById = async (id) => {
            const response = await UserService.findOneById(id);
            setUserDetails(response);
        };
        dispatch(loadUser(id));

        fetchUserById(id);
    }, [id, dispatch]);

    const onSubmitHandler = useCallback((id) => {
        const { confirmPassword, roleId, ...user} = id;
        const userId = id;
        const {history} = props;
        if (user.password === confirmPassword && userId && user.password === confirmPassword && user.firstName.length > 2 && user.lastName.length > 2 && user.middleName.length > 2 && user.password.length > 5) {
            user.userId = userId;
            dispatch(editUser(user));
            history.goBack();
        }
    }, [dispatch, props]);

    return (
        <div>
            {
                userDetails ? (
                    <SaveUserForm
                        onSubmit={onSubmitHandler}
                        titleText="Edit User"
                        submitButton="Edit"
                        userDetails={userDetails}
                        disabled={true}
                        isEdit={false}
                    />
                ) : null
            }
        </div>
    );
};
