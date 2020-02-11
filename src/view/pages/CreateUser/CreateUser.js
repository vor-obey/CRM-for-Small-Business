import React, {useCallback, useEffect, useState} from 'react';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {UserService} from "../../../services";
import {history} from "../../../utils/history";

export const CreateUser = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            const roles = await UserService.getRoles();
            setRoles(roles);
        };
        fetchRoles();
    }, []);

    const onSubmitHandler = useCallback( async (userInput) => {
        const {confirmPassword, ...user} = userInput;
        const response = await UserService.create(user);
        if (response) {
            history.push('/users');
        } else {
            console.log('error');
        }
    }, []);

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
