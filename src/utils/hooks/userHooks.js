import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../data/store/auxiliary/auxiliaryActions';
import {RoleService} from '../../services';
import {COMMON_ERROR_MESSAGE} from '../../constants/statuses';
import UserService from '../../services/UserService';

export const useManagers = () => {
    const [managers, setManagers] = useState([]);
    const [managerLoading, setManagerLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                setManagerLoading(true);
                dispatch(setIsLoading(true));
                const managers = await UserService.list();
                setManagers(managers);
                dispatch(setIsLoading(false));
                setManagerLoading(false);
            } catch (e) {
                setManagerLoading(false);
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
            }
        };
        fetchManagers();
    }, [dispatch]);

    return {managers, setManagers, managerLoading};
};

export const useManagerById = (id) => {
    const [managerDetails, setManagerDetails] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await UserService.findOneById(id);
                setManagerDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}))
            }
        };
        fetchUserById();
    }, [id, dispatch]);

    return {managerDetails, setManagerDetails};
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

    return {roles, setRoles};
};
