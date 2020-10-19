import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../data/store/auxiliary/auxiliaryActions';
import {RoleService} from '../../services';
import {COMMON_ERROR_MESSAGE} from '../../constants/statuses';
import UserService from '../../services/UserService';
import {getRoles, getUserById, getUsers} from "../../data/store/user/userActions";

export const useManagers = () => {
    const [managers, setManagers] = useState([]);
    const [managerLoading, setManagerLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                setManagerLoading(true);
                const managers = await UserService.list();
                setManagers(managers);
                setManagerLoading(false);
            } catch (e) {
                setManagerLoading(false);
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchManagers();
    }, [dispatch]);

    return { managers, setManagers, managerLoading };
};

export const useUsersState = () => {
    const dispatch = useDispatch();
    const { users, usersStatus } = useSelector(state => state.userReducer);

    useEffect(() => {
        if(!users.length && !usersStatus.isLoading && !usersStatus.isSuccess) {
            dispatch(getUsers());
        }
    }, [dispatch, users, usersStatus])

    return { users, usersStatus };
}

export const useRolesState = () => {
    const dispatch = useDispatch();
    const { roles, rolesStatus } = useSelector(state => state.userReducer);
    useEffect(() => {
        if(!roles.length && !rolesStatus.isLoading && !rolesStatus.isSuccess) {
            dispatch(getRoles());
        }
    }, [dispatch, roles, rolesStatus])

    return { roles, rolesStatus };
}

export const useManagerById = (id) => {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userReducer.userDetails)

    useEffect(() => {
        if(!userDetails || id !== userDetails.userId) {
            const fetchUserById = async () => {
                try {
                    await dispatch(getUserById(id));
                } catch (e) {
                    dispatch(setIsLoading(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}))
                }
            };
            fetchUserById();
        }

    }, [id, userDetails, dispatch]);

    return { userDetails };
};

export const useRoles = () => {
    const [roles, setRoles] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                dispatch(setIsLoading(true));
                const roles = await RoleService.list();
                setRoles(roles);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}))
            }
        };
        fetchRoles();
    }, [dispatch]);

    return { roles, setRoles };
};
