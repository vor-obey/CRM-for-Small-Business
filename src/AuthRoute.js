import React, {useEffect, useState} from "react";
import {Route, Redirect} from "react-router-dom";
import StorageService from './services/StorageService';
import {useSelector} from "react-redux";

function AuthRoute({component: Component, ...rest}) {
    const [isAuthenticated, setIsAuthenticated] = useState(StorageService.getJWTToken());
    const currentUser = useSelector(state => state.userReducer.currentUser);

    useEffect(() => {
        StorageService.getJWTToken() ? setIsAuthenticated(true) : setIsAuthenticated(false);
    }, [currentUser]);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Redirect to="/dashboard"/>
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}


export default AuthRoute;
