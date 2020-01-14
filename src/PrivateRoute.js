import React, {useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
// import { useAuth } from "./data/context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            setAuthenticated(true);
        }
    }, []);

    console.info(isAuthenticated)

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
