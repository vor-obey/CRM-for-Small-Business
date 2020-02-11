import React, {useCallback, useEffect, useState} from 'react';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {UserService} from "../../../services";

export const CreateUser = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            const roles = await UserService.getRoles();
            setRoles(roles);
        };
        fetchRoles();
    }, []);



    const onSubmitHandler = useCallback((userInput) => {
        const {confirmPassword, ...user} = userInput;
        if (user.password !== confirmPassword) {
            console.log('password doesnt match')
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
