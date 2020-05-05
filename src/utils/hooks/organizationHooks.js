import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setIsLoading, setSnackBarStatus} from '../../data/store/auxiliary/auxiliaryActions';
import {OrganizationService} from '../../services';
import {COMMON_ERROR_MESSAGE} from '../../constants/statuses';

export const useOrganizationDetailsById = (id) => {
    const [organizationDetails, setOrganizationDetails] = useState({});
    const [triggerCount, triggerOrganizationDetailsUpdate] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOrganizationById = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await OrganizationService.findOneById(id);
                setOrganizationDetails(response);
                dispatch(setIsLoading(false));
            } catch (e) {
                dispatch(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
                dispatch(setIsLoading(false))
            }
        };
        fetchOrganizationById(id);
    }, [id, dispatch, triggerCount]);

    return [organizationDetails, setOrganizationDetails, triggerOrganizationDetailsUpdate];
};