import React from "react";
import {Notification} from "./Notification";
import {store} from "react-notifications-component";

export function addNotification (notification) {
    store.addNotification({
        content: <Notification notification={notification}/>,   // 👈
        container: 'top-right',
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
            duration: 5000
        }
    });
}
