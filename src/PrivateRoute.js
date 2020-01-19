import React, {useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import StorageService from './services/StorageService';

function PrivateRoute({ component: Component, ...rest }) {
    const [isAuthenticated, setAuthenticated] = useState(StorageService.getJWTToken());

    useEffect(() => {
        const token = StorageService.getJWTToken();

        if (token) {
            setAuthenticated(true);
        }
    },[]);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}

export default PrivateRoute;
