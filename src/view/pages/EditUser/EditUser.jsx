import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useParams} from 'react-router-dom';
import {SaveUserForm} from '../../components/Form/SaveUserForm/SaveUserForm';
import {UserService} from "../../../services";
import {isEmpty} from 'lodash';

export const EditUser = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchData = async (id) => {
            const userDetails = await UserService.findOneById(id);
            setUserDetails(userDetails);

            const roles = await UserService.getRoles();
            setRoles(roles);
        };

        fetchData(id);
    }, [id, roles, dispatch]);


    const onSubmitHandler = useCallback((event, userInput) => {
        event.preventDefault();
        console.log(userInput);
    }, []);

    return (
        <>
            {
                !isEmpty(userDetails) && !isEmpty(roles) ? (
                    <SaveUserForm
                        onSubmit={onSubmitHandler}
                        titleText="Edit User"
                        buttonText="Edit"
                        userDetails={userDetails}
                        roles={roles}
                        isEdit={false}
                    />
                ) : null
            }
        </>
    );
};
