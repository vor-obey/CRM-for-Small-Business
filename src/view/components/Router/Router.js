import React, { useEffect } from 'react';
import {Router, Route} from 'react-router-dom';
import StorageService from "../../../services/StorageService";
import { useDispatch } from "react-redux";

import Header from "../Navigation/Header/Header";
import AuthRoute from "../../../AuthRoute";

import PrivateRoute from "../../../PrivateRoute";
import Login from "../../pages/Login/Login";
import Home from "../../pages/Home/Home";
import {CreateUser} from "../../pages/CreateUser/CreateUser";
import LogOut from "../../pages/LogOut/LogOut";
import {UsersPage} from "../../pages/UsersPage/UsersPage";
import {CustomersPage} from "../../pages/CustomersPage/CustomersPage";
import {UserDetailsPage} from "../../pages/UserDetailsPage/UserDetailsPage";
import RestorePassword from "../../pages/RestorePassword/RestorePassword";
import {EditUser} from "../../pages/EditUser/EditUser";
import CustomerDetailsPage from "../../pages/CustomerDetailsPage/CustomerDetailsPage";
import CreateCustomer from "../../pages/CreateCustomer/CreateCustomer";
import EditCustomer from "../../pages/EditCustomer/EditCustomer";
import {getCurrentUser} from "../../../data/store/user/userThunkAction";
import {ShippingDetails} from "../ShippingDetails/ShippingDetails";
import {ForgotPassword} from "../../pages/ForgotPassword/ForgotPassword";
import {OrdersPage} from "../../pages/OrdersPage/OrdersPage";
import {OrderDetails} from "../../pages/OrdersPage/OrderDetails/OrderDetails";
import {history} from "../../../utils/history";
import CreateOrderPage from "../../pages/CreateOrderPage/CreateOrderPage";

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
                <PrivateRoute exact path='/customers' component={CustomersPage} />
                <PrivateRoute exact path='/customers/:id' component={CustomerDetailsPage} />
                <PrivateRoute exact path='/customers/:id/edit' component={EditCustomer} />
                <PrivateRoute exact path='/users' component={UsersPage} />
                <PrivateRoute exact path='/users/:id/edit' component={EditUser} />
                <PrivateRoute exact path='/users/:id' component={UserDetailsPage} />
                <PrivateRoute path='/create-shipping-details' component={ShippingDetails} />
                <PrivateRoute path='/orders' exact component={OrdersPage} />
                <PrivateRoute path='/orders/:id' component={OrderDetails} />
                <PrivateRoute path='/create-order' component={CreateOrderPage}/>
                <Route exact path='/restore_password/:token' component={RestorePassword} />
                <Route path='/forgot_password' exact component={ForgotPassword} />
                <Route exact path='/restore-password/:token' component={RestorePassword} />
                <Route path='/forgot-password' exact component={ForgotPassword} />
            </div>
        </Router>
    )
}

export default Routing;
