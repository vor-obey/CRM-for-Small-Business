import React, {useCallback, useEffect, useState} from 'react';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {UserService} from "../../../services";

export const CreateUser = (props) => {
    const [roles, setRoles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
            setErrorMessage(`Password doesn't match`);
            setIsOpen(true);
            return;
        }
        console.log(confirmPassword, user);
    }, []);

    console.log(isOpen, errorMessage);

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
