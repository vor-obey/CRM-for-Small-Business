import React, { useEffect, useState }  from "react";
import { Route, Redirect } from "react-router-dom";
import StorageService from './services/StorageService';
import { useSelector } from "react-redux";

function AuthRoute({ component: Component, ...rest }) {
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

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}


export default AuthRoute;
