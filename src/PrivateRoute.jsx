import React, {useCallback, useEffect, useState} from "react";
import {Route, Redirect} from "react-router-dom";
import StorageService from './services/StorageService';
import {useSelector} from "react-redux";

export const PrivateRoute = ({component: Component, ...rest}) => {
    const [isAuthenticated, setAuthenticated] = useState(StorageService.getJWTToken());
    const currentUser = useSelector((state) => state.userReducer.currentUser);

    useEffect(() => {
        const token = StorageService.getJWTToken();

        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [currentUser]);

    const renderComponent = useCallback((props) => {
        const {match} = props;
        const role = currentUser.role && currentUser.role.name;
        const enabled = currentUser.organization && currentUser.organization.enabled;

        if (match.path === '/') {
            return isAuthenticated ? <Redirect to='/dashboard'/> : <Component {...props} />;
        }

        if (!isAuthenticated) {
            return <Redirect to='/'/>;
        }

        if (isAuthenticated && enabled === false) {
            StorageService.removeJWTToken();
            return <Redirect to='/'/>;
        }

        if (role && (match.path === '/organizations/:id' || match.path === '/organizations/:id/edit')) {
            return role === 'Owner' ? <Component {...props} /> : <Redirect to='/'/>;
        }

        return <Component {...props} />;
    }, [currentUser, isAuthenticated]);

    return (
        <Route
            {...rest}
            render={props => renderComponent(props)}
        />
    );
};