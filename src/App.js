import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import PrivateRoute from './PrivateRoute.js';
import Admin from './pages/Admin/Admin.js';
import Login from './pages/Login.js';
import SignUp from './components/Signup/Signup.js';
import LogOut from './pages/LogOut/LogOut.js'
import Header from './components/Navigation/Header/Header.js';
import { AuthContext } from "./context/auth";


function App(props) {
    const [authTokens, setAuthTokens] = useState();
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router>
                <div>
                    <Header />
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={SignUp} />
                    <Route path='/logout' component={LogOut} />
                    <PrivateRoute path="/admin" component={Admin} />

                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
