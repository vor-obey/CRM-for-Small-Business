import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import StorageService from './services/StorageService';
import { useSelector } from "react-redux";

export const OrganizationRoute = ({ component: Component, ...rest }) => {
    const [isOwner, setOwner] = useState(StorageService.getJWTToken());
    const currentUser = useSelector((state) => state.userReducer.currentUser);

    useEffect(() => {
        const token = StorageService.getJWTToken();

        if (token && currentUser && currentUser.role.name === 'Admin') {
            setOwner(true);
        } else {
            setOwner(false);
        }
    }, [currentUser]);

    return (
        <Route
            {...rest}
            render={props =>
                isOwner ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};
