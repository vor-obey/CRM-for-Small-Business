import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {InstagramService, StorageService} from '../services';
import {setIsLoading, setSnackBarStatus} from '../data/store/auxiliary/auxiliaryActions';
import {
    initIgChatConnection,
    initSocketConnection,
    setChatInit, setIgProfile,
    setIsAutoConnectToChat,
    setIsIgExists, setThreads
} from '../data/store/user/userActions';
import isEmpty from 'lodash/isEmpty';

export const InstagramConnection = () => {
    const {
        isIgIntegrated,
        currentUser,
        isIgExists,
        isAutoConnectToChat,
        chatInit,
        socket
    } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const localStorageChatConnection = JSON.parse(StorageService.getChatConnection());
        dispatch(setIsAutoConnectToChat(!!localStorageChatConnection));
    }, [dispatch]);

    useEffect(() => {
        const check = async () => {
            try {
                dispatch(setIsLoading(true));
                const response = await InstagramService.check();
                if (response.success) {
                    dispatch(setIsLoading(false));
                    dispatch(setIsIgExists(true));
                    dispatch(setChatInit(true));
                    dispatch(setSnackBarStatus({
                        isOpen: true,
                        message: 'Connection established with IG',
                        success: true
                    }));
                } else {
                    dispatch(setIsLoading(false));
                    dispatch(setIsIgExists(false));
                    dispatch(setChatInit(false));
                    dispatch(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
                }
            } catch (e) {
                dispatch(setIsLoading(false));
                dispatch(setIsIgExists(false));
                dispatch(setChatInit(false));
                dispatch(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
            }
        };
        if (!isEmpty(currentUser) && isAutoConnectToChat && isIgIntegrated && !isIgExists) {
            check();
        }
    }, [currentUser, dispatch, isIgExists, isIgIntegrated, isAutoConnectToChat]);

    const fetchThreads = useCallback(async () => {
        const response = await InstagramService.getThreads();
        dispatch(setThreads(response));
    }, [dispatch]);

    const fetchIgProfile = useCallback(async () => {
        const response = await InstagramService.getProfile();
        dispatch(setIgProfile(response));
    }, [dispatch]);

    useEffect(() => {
        if (chatInit && !socket) {
            const {organizationId} = currentUser.organization;
            dispatch(initSocketConnection(organizationId))
        }
    }, [chatInit, dispatch, currentUser.organization, socket]);

    useEffect(() => {
        if (socket !== null) {
            dispatch(initIgChatConnection(socket));
            fetchIgProfile();
            fetchThreads();
        }
    }, [socket, dispatch, fetchThreads, fetchIgProfile]);
};