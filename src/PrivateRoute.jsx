import React, {useEffect, useState} from "react";
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

    const renderComponent = (props) => {
        const {match} = props;
        const role = currentUser && currentUser.role.name;
        if (!isAuthenticated) {
            return <Redirect to='/'/>
        }

        if (role && (match.path === '/organizations/:id' || match.path === '/organizations/:id/edit')) {
            return role === 'Owner' ? <Component {...props} /> : <Redirect to='/'/>
        }

        return <Component {...props} />;
    };

    return (
        <Route
            {...rest}
            render={props => renderComponent(props)}
        />
    );
};