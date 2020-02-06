import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {UserService} from "../../../services";
import {isEmpty} from 'lodash';

export const EditUser = () => {
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
    }, [id]);


    const onSubmitHandler = useCallback((userInput) => {
        console.log(userInput);
    }, []);

    return (
        // todo refactor
        <>
            {
                !isEmpty(userDetails) && !isEmpty(roles) ? (
                    <SaveUserForm
                        onSubmit={onSubmitHandler}
                        titleText="Edit User"
                        buttonText="Edit"
                        userDetails={userDetails}
                        roles={roles}
                        isEdit={true}
                    />
                ) : null
            }
        </>
    );
};
