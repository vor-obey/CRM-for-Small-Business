import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
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
import CustomersPage from "../../pages/CustomersPage/CustomersPage";
import UserDetailsPage from "../../pages/UserDetailsPage/UserDetailsPage";
import EditUser from "../../pages/EditUser/EditUser";
import CustomerDetailsPage from "../../pages/CustomerDetailsPage/CustomerDetailsPage";
import CreateCustomer from "../../pages/CreateCustomer/CreateCustomer";
import EditCustomer from "../../pages/EditCustomer/EditCustomer";
import {getCurrentUser} from "../../../data/store/user/userThunkAction";
import {ShippingDetails} from "../ShippingDetails/ShippingDetails";
import {history} from "../../../utils/history";




function Routing() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = StorageService.getJWTToken();

        if (token) {
            dispatch(getCurrentUser())
        }
    }, [dispatch]);


    return (
        <Router history={history}>
            <div>
                <Header />
                <AuthRoute exact path="/" component={Login} />
                <PrivateRoute path="/dashboard" component={Home} />
                <PrivateRoute path="/create-user" component={CreateUser} />
                <PrivateRoute path="/create-customer" component={CreateCustomer} />
                <PrivateRoute path='/logout' component={LogOut} />
                <PrivateRoute path='/users' exact component={UserPage} />
                <PrivateRoute exact path='/customers' component={CustomersPage} />
                <PrivateRoute exact path='/customers/:id' component={CustomerDetailsPage} />
                <PrivateRoute exact path='/customers/:id/edit' component={EditCustomer} />
                <PrivateRoute exact path='/users'  component={UserPage} />
                <PrivateRoute exact path='/users/:id/edit' component={EditUser} />
                <PrivateRoute exact path='/users/:id' component={UserDetailsPage} />
                <PrivateRoute path='/create-shipping-details' component={ShippingDetails} />
            </div>
        </Router>
    )
}

export default Routing;
