import React, {useEffect} from 'react';
import {Router, Route} from 'react-router-dom';
import StorageService from "../../../services/StorageService";
import {useDispatch} from "react-redux";

import {Header} from "../Navigation/Header/Header";
import {AuthRoute} from "../../../AuthRoute";
import {PrivateRoute} from "../../../PrivateRoute";
import {Login} from "../../pages/Login/Login";
import {Home} from "../../pages/Home/Home";
import {CreateUser} from "../../pages/CreateUser/CreateUser.jsx";
import LogOut from "../../pages/LogOut/LogOut";
import {UsersPage} from "../../pages/UsersPage/UsersPage";
import {CustomersPage} from "../../pages/CustomersPage/CustomersPage";
import {UserDetailsPage} from "../../pages/UserDetailsPage/UserDetailsPage";
import RestorePassword from "../../pages/RestorePassword/RestorePassword";
import {CustomerDetailsPage} from "../../pages/CustomerDetailsPage/CustomerDetailsPage";
import {CreateCustomer} from "../../pages/CreateCustomer/CreateCustomer";
import {EditCustomer} from "../../pages/EditCustomer/EditCustomer";
import {getCurrentUser} from "../../../data/store/user/userThunkAction";
import {ShippingDetails} from "../ShippingDetails/ShippingDetails";
import {ForgotPassword} from "../../pages/ForgotPassword/ForgotPassword";
import {OrdersPage} from "../../pages/OrdersPage/OrdersPage";
import {OrderDetailsPage} from "../../pages/OrderDetailsPage/OrderDetailsPage";
import {history} from "../../../utils/history";
import {CreateOrderPage} from "../../pages/CreateOrderPage/CreateOrderPage";
import {CreateOrganization} from "../../pages/CreateOrganization/CreateOrganization";
import {CreateCode} from "../../pages/CreateCode/CreateCode";
import {EditUser} from '../../pages/EditUser/EditUser';
import {EditOrder} from '../../pages/EditOrder/EditOrder';

export const Routing = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const token = StorageService.getJWTToken();

      if (token) {
         dispatch(getCurrentUser());
      }
   }, [dispatch]);


   return (
      <Router history={history}>
         <Header/>
         <AuthRoute exact path="/" component={Login}/>
         <PrivateRoute exact path="/dashboard" component={Home}/>
         <PrivateRoute exact path="/create-user" component={CreateUser}/>
         <PrivateRoute exact path="/create-customer" component={CreateCustomer}/>
         <PrivateRoute exact path='/logout' component={LogOut}/>
         <PrivateRoute exact path='/customers' component={CustomersPage}/>
         <PrivateRoute exact path='/customers/:id' component={CustomerDetailsPage}/>
         <PrivateRoute exact path='/customers/:id/edit' component={EditCustomer}/>
         <PrivateRoute exact path='/users' component={UsersPage}/>
         <PrivateRoute exact path='/users/:id/edit' component={EditUser}/>
         <PrivateRoute exact path='/users/:id' component={UserDetailsPage}/>
         <PrivateRoute exact path='/create-shipping-details' component={ShippingDetails}/>
         <PrivateRoute exact path='/orders' component={OrdersPage}/>
         <PrivateRoute exact path='/create-order' component={CreateOrderPage}/>
         <PrivateRoute exact path='/orders/:id' component={OrderDetailsPage}/>
         <PrivateRoute exact path='/orders/:id/edit' component={EditOrder}/>
         <PrivateRoute exact path='/create-code' component={CreateCode} />
         <Route exact path='/restore_password/:token' component={RestorePassword}/>
         <Route exact path='/forgot_password' component={ForgotPassword}/>
         <Route exact path='/restore-password/:token' component={RestorePassword}/>
         <Route exact path='/forgot-password' component={ForgotPassword}/>
         <Route exact path='/create-organization' component={CreateOrganization} />
      </Router>
   )
};
