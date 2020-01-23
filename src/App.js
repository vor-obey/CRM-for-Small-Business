import React, { useState } from 'react';

import { AuthContext } from "./data/context/auth";
import { Provider } from "react-redux";
import Router from "./view/components/Router/Router";
import { store } from "./data/store/configureStore";

import {ThemeProvider} from "@material-ui/core/styles";
import { theme } from "./view/theme";

function App(props) {
    const [authTokens, setAuthTokens] = useState();
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                    <Router />
                </AuthContext.Provider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
