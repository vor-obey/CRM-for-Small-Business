import React, { useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import StorageService from "../../../services/StorageService";
// import { useDispatch } from 'react-redux'

import Header from "../Navigation/Header/Header";
import AuthRoute from "../../../AuthRoute";

import PrivateRoute from "../../../PrivateRoute";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import CreateUser from "../../pages/CreateUser/CreateUser";
import LogOut from "../../pages/LogOut/LogOut";
import UserPage from "../../pages/UsersPage/UsersPage";
import UserDetailsPage from "../../pages/UserDetailsPage/UserDetailsPage";
import {useSelector} from "react-redux";


function Routing() {
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    // const dispatch = useDispatch();

    useEffect(() => {
        const token = StorageService.getJWTToken();

        if (token) {
            console.log('token good')
        }
    }, [currentUser]);


    return (
        <Router>
            <div>
                <Header />
                <AuthRoute exact path="/" component={Login} />
                <PrivateRoute path="/dashboard" component={Home} />
                <PrivateRoute path="/create-user" component={CreateUser} />
                <PrivateRoute path='/logout' component={LogOut} />
                <PrivateRoute path='/users' exact component={UserPage} />
                <PrivateRoute path='/users/:id' component={UserDetailsPage} />
            </div>
        </Router>

    )
}

export default Routing;
