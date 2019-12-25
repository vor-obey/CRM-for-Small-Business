import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.js';
import { AuthContext } from "./data/context/auth";

import { ThemeProvider } from '@material-ui/styles';
import { Provider } from "react-redux";

import { store } from "./data/store/configureStore";

import { theme } from "./view/theme";
import Home from './view/pages/Home/Home.js';
import Admin from './view/pages/Admin/Admin.js';
import Login from './view/pages/Login/Login.js';
import CreateUser from './view/pages/CreateUser/CreateUser.js';
import LogOut from './view/pages/LogOut/LogOut.js';
import UserPage from './view/pages/UsersPage/UserPage.jsx';

import Header from './view/components/Navigation/Header/Header.js';

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
                    <Router>
                        <div>
                            <Header />
                            <Route exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/create-user" component={CreateUser} />
                            <Route path='/logout' component={LogOut} />
                            <Route path='/users' component={UserPage} />
                            <PrivateRoute path="/admin" component={Admin} />

                        </div>
                    </Router>
                </AuthContext.Provider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
