import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SaveUserForm} from '../../components/SaveUser/SaveUserForm';
import {UserService} from "../../../services";
import {history} from "../../../utils/history";


export const EditUser = () => {
    const {id} = useParams();
    const [userDetails, setUserDetails] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchData = async (id) => {
            const response = await UserService.findOneById(id);
            const {orders, organization, role: {roleId}, ...userDetails} = response;
            setUserDetails({roleId, ...userDetails});

            const roles = await UserService.getRoles();
            setRoles(roles);
        };

        fetchData(id);
    }, [id]);


    const onSubmitHandler = useCallback((userInput) => {
        const {roleId, ...user} = userInput;
        UserService.update({...user})
            .then(res => {
                if (res.success) {
                    history.push('/users');
                }
            })
            .catch(e => {
                console.log(e);
            });

    }, [id]);

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
