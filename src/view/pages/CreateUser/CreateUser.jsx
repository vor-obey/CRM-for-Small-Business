import React, {useCallback, useEffect, useState} from 'react';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {UserService} from "../../../services";

export const CreateUser = (props) => {
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const fetchRoles = async () => {
            const roles = await UserService.getRoles();
            setRoles(roles);
        };
        fetchRoles();
    }, []);


    const onSubmitHandler = useCallback((userInput) => {
        console.log(userInput);
        // const {
        //     confirmPassword,
        //     ...user
        // } = userInput;
        // const {history} = props;
        // if (user.password === confirmPassword && user.firstName.length > 2 && user.lastName.length > 2 && user.middleName.length > 2 && user.password.length > 5) {
        //     dispatch(postUser(user));
        //     history.push('/users');
        // }
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
