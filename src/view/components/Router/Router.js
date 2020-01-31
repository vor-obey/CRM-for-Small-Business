import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import StorageService from "../../../services/StorageService";
import { useDispatch } from "react-redux";

import Header from "../Navigation/Header/Header";
import AuthRoute from "../../../AuthRoute";

import PrivateRoute from "../../../PrivateRoute";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import CreateUser from "../../pages/CreateUser/CreateUser";
import LogOut from "../../pages/LogOut/LogOut";
import UserPage from "../../pages/UsersPage/UsersPage";
import UserDetailsPage from "../../pages/UserDetailsPage/UserDetailsPage";
import RestorePassword from "../../pages/RestorePassword/RestorePassword";

import {getCurrentUser} from "../../../data/store/user/userThunkAction";
import {ShippingDetails} from "../ShippingDetails/ShippingDetails";
import {ForgotPassword} from "../../pages/ForgotPassword/ForgotPassword";


function Routing() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = StorageService.getJWTToken();

        if (token) {
            dispatch(getCurrentUser())
        }
    }, [dispatch]);


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
                <PrivateRoute path='/create-shipping-details' component={ShippingDetails} />
                <Route exact path='/restore_password/:token' component={RestorePassword} />
                <Route path='/forgot_password' exact component={ForgotPassword} />
            </div>
        </Router>

    )
}

export default Routing;
