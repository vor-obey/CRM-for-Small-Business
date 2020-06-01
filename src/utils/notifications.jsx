import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {displayNotification} from "../data/store/auxiliary/auxiliaryThunkActions";

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

    useEffect(() => {
        if (location.pathname !== '/dashboard' && location.pathname !== '/chat') {
            if (lastMessage && lastMessage.user_id !== igProfile.pk) {
                dispatch(displayNotification({
                    icon: thread && thread.inviter.profile_pic_url,
                    text: lastMessage.text,
                    username: thread && thread.thread_title,
                    date: new Date(),
                    status: 'message',
                    onClick: navigationClick
                }));
            }
        }
    }, [dispatch, lastMessage, igProfile, location, navigationClick, thread]);
};
