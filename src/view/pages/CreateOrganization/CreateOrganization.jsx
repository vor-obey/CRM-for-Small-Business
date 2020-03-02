import React, {useCallback, useEffect, useState} from "react";
import {SaveOrganization} from "../../components/SaveOrganization/SaveOrganization";
import {SaveUserForm} from "../../components/SaveUser/SaveUserForm";
import {applyMiddleware as dispatch} from "redux";
import {setIsLoading, setSnackBarStatus} from "../../../data/store/auxiliary/auxiliaryActions";
import {RoleService, UserService} from "../../../services";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";

export const CreateOrganization = (props) => {

    const {history} = props;
    const [isForm, setIsForm] = useState(false);
    const [roles, setRoles] = useState([]);



    useEffect(() => {
        const fetchRoles = async () => {
            try {
                dispatch(setIsLoading(true));
                const roles = await RoleService.list();
                setRoles(roles);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
            }
        };
        fetchRoles();
    }, []);

    const defRoleAdmin = () => {
        return roles.find(role => role.name === 'Admin')
    };


    const onSubmitHandler = useCallback(async (userInput) => {
        const {confirmPassword, ...user} = userInput;
        try {
            dispatch(setIsLoading(true));
            await UserService.create(user);
            dispatch(setIsLoading(false));
            history.push('/login');
        } catch (e) {
            dispatch(setIsLoading(false));
            dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
        }
    }, [dispatch, history]);
    //
    // const onSubmitOrg = useCallback(async (userInput) => {
    //     const {confirmPassword, ...user} = userInput;
    //     try {
    //         dispatch(setIsLoading(true));
    //         await Щкп.create(user);
    //         dispatch(setIsLoading(false));
    //         history.push('/login');
    //     } catch (e) {
    //         dispatch(setIsLoading(false));
    //         dispatch(setSnackBarStatus({isOpen: true, errorMessage: COMMON_ERROR_MESSAGE}))
    //     }
    // }, [dispatch, history]);


    const renderCreateOrganization = () => {
        return (
            <SaveOrganization
                // onSubmit={onSubmitOrg}
                title={'Create Organization'}
            />
        )
    };

    const renderCreateUser = () => {
        return (
            <SaveUserForm
                onSubmit={onSubmitHandler}
                title="Create User"
                buttonText="Create"
                roles={roles}
                defRoleAdmin={defRoleAdmin()}
            />
        )
    };


    return (
        <>
        {isForm ? renderCreateOrganization() : renderCreateUser()}
        </>
    )
};