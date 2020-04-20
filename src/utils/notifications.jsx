import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {displayNotification} from "../data/store/auxiliary/auxiliaryThunkActions";

export const NotificationsFunc = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const threads = useSelector(state => state.userReducer.threads);
    const profile = useSelector(state => state.userReducer.igProfile);
    const addMessage = useSelector(state => state.userReducer.messages);

    const message = addMessage[addMessage.length - 1];
    const users = threads.filter(item => item.thread_id === (message && message.message.thread_id));
    const user = users[users.length - 1];
    const status = true;

    const navigationClick = useCallback(() => {
        history.push({
            pathname: '/chat',
            state: {
                id: addMessage.length > 1 ? user.thread_id : null,
                status: status
            }
        })
    }, [history, user, status]);

    useEffect(() => {
        if (location.pathname === '/dashboard' || location.pathname === '/chat') {
        } else if (message !== undefined && message.message.user_id !== profile.pk) {
            dispatch(displayNotification({
                icon: user && user.inviter.profile_pic_url,
                text: message && message.message.text,
                date: new Date(),
                onClick: navigationClick
            }));
        }
    }, [dispatch, message]);
};
