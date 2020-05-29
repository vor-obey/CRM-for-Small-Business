import {store} from "react-notifications-component";
import {Notification} from '../../../view/components/Notification/Notification';
import React from 'react';
import {addNotification} from './auxiliaryActions';

export const displayNotification = (notification) => {
    store.addNotification({
        content: <Notification notification={notification}/>,
        container: 'bottom-right',
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 5000
        }
    });
    return (addNotification(notification));
};
