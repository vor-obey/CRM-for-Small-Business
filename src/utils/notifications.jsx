import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {displayNotification} from "../data/store/auxiliary/auxiliaryThunkActions";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

export const NotificationsFunc = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const {threads, igProfile, messages} = useSelector(state => state.userReducer);

    const lastMessage = messages[messages.length - 1];
    const thread = threads.find(item => item.thread_id === (lastMessage && lastMessage.thread_id));

    const navigationClick = useCallback(() => {
        history.push({
            pathname: '/chat',
        })
    }, [history]);

    const icon = useCallback(() => {
        if (thread) {
            if (thread.users.length > 1) {
                return <PeopleAltIcon/>
            }

            return thread.users[0].profile_pic_url;
        }
    }, [thread]);

    useEffect(() => {
        if (location.pathname !== '/dashboard' && location.pathname !== '/chat') {
            if (lastMessage && lastMessage.user_id !== igProfile.pk && thread) {
                dispatch(displayNotification({
                    icon: icon(),
                    text: lastMessage.item_type === 'text' ? lastMessage.text : 'Unsupported content',
                    username: thread && thread.thread_title,
                    date: new Date(),
                    status: 'message',
                    onClick: navigationClick
                }));
            }
        }
    }, [dispatch, lastMessage, igProfile, location, navigationClick, thread, icon]);
};
