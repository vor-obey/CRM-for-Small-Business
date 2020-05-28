import React, {useEffect} from 'react';
import {Router, Route} from 'react-router-dom';
import StorageService from "../../../services/StorageService";
import {useDispatch, useSelector} from "react-redux";

import {Header} from "../Navigation/Header/Header";
import {PrivateRoute} from "../../../PrivateRoute";
import {Login} from "../../pages/Login/Login";
import {Home} from "../../pages/Home/Home";
import {CreateUser} from "../../pages/CreateUser/CreateUser.jsx";
import {UsersPage} from "../../pages/UsersPage/UsersPage";
import {CustomersPage} from "../../pages/CustomersPage/CustomersPage";
import {UserDetailsPage} from "../../pages/UserDetailsPage/UserDetailsPage";
import RestorePassword from "../../pages/RestorePassword/RestorePassword";
import {CustomerDetailsPage} from "../../pages/CustomerDetailsPage/CustomerDetailsPage";
import {CreateCustomer} from "../../pages/CreateCustomer/CreateCustomer";
import {EditCustomer} from "../../pages/EditCustomer/EditCustomer";
import {getCurrentUser} from "../../../data/store/user/userActions";
import {ForgotPassword} from "../../pages/ForgotPassword/ForgotPassword";
import {OrdersPage} from "../../pages/OrdersPage/OrdersPage";
import {OrderDetailsPage} from "../../pages/OrderDetailsPage/OrderDetailsPage";
import {history} from "../../../utils/history";
import {CreateOrderPage} from "../../pages/CreateOrderPage/CreateOrderPage";
import {CreateOrganization} from "../../pages/CreateOrganization/CreateOrganization";
import {EditUser} from '../../pages/EditUser/EditUser';
import {EditOrder} from '../../pages/EditOrder/EditOrder';
import {NotificationPage} from "../../pages/NotificationPage/NotificationPage";
// import {DraggableChat} from '../DraggableChat/DraggableChat';
import {OrganizationDetailsPage} from "../../pages/OrganizationDetailsPage/OrganizationDetailsPage";
import {EditOrganization} from "../../pages/EditOrganization/EditOrganization";
import {CreateAbstractProductPage} from '../../pages/CreateAbstractProductPage/CreateAbstractProductPage';
import {CreateProduct} from '../../pages/CreateProduct/CreateProduct';
import {AbstractProductsPage} from '../../pages/AbstractProductsPage/AbstractProductsPage';
import {ProductsPage} from '../../pages/ProductsPage/ProductsPage';
import {AbstractProductDetailsPage} from '../../pages/AbstractProductDetailsPage/AbstractProductDetailsPage';
import {ProductDetailsPage} from '../../pages/ProductDetailsPage/ProductDetailsPage';
import {ProductTypesPage} from '../../pages/ProductTypesPage/ProductTypesPage';
import {ProductTypeDetailsPage} from '../../pages/ProductTypeDetailsPage/ProductTypeDetailsPage';
import {EditAbstractProduct} from '../../pages/EditAbstractProduct/EditAbstractProduct';
import {CustomModal} from '../CustomModal/CustomModal';
import {CustomDialog} from '../CustomDialog/CustomDialog';
import {EditProduct} from '../../pages/EditProduct/EditProduct';
import {CreateProductTypeWithAttributes} from '../../pages/CreateProductTypeWithAttributes/CreateProductTypeWithAttributes';
import {EditProductTypeWithAttributes} from '../../pages/EditProductTypeWithAttributes/EditProductTypeWithAttributes';
import {ChatWrapper} from "../ChatWrapper/ChatWrapper";

export const Routing = () => {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.auxiliaryReducer.modal);
    const dialog = useSelector(state => state.auxiliaryReducer.dialog);

    useEffect(() => {
        const token = StorageService.getJWTToken();

        if (token) {
            dispatch(getCurrentUser());
        }

    }, [dispatch]);

    return (
        <Router history={history}>
            <Header/>
            {/*<DraggableChat/>*/}
            <CustomModal
                open={modal.isOpen}
                handleClose={modal.onCloseHandler}
                allowBackDropClick={modal.allowBackDropClick}
            >
                {modal.children}
            </CustomModal>
            <CustomDialog
                title={dialog.title}
                isShow={dialog.isShow}
                onClose={dialog.onCloseHandler}
                closeText={dialog.closeText}
                actionText={dialog.actionText}
                onAction={dialog.onActionHandler}
            >
                {dialog.children}
            </CustomDialog>
            <PrivateRoute exact path="/" component={Login}/>
            <PrivateRoute exact path="/dashboard" component={Home}/>
            <PrivateRoute exact path="/create-user" component={CreateUser}/>
            <PrivateRoute exact path="/create-customer" component={CreateCustomer}/>
            <PrivateRoute exact path='/customers' component={CustomersPage}/>
            <PrivateRoute exact path='/customers/:id' component={CustomerDetailsPage}/>
            <PrivateRoute exact path='/customers/:id/edit' component={EditCustomer}/>
            <PrivateRoute exact path='/users' component={UsersPage}/>
            <PrivateRoute exact path='/users/:id/edit' component={EditUser}/>
            <PrivateRoute exact path='/users/:id' component={UserDetailsPage}/>
            <PrivateRoute exact path='/orders' component={OrdersPage}/>
            <PrivateRoute exact path='/create-order' component={CreateOrderPage}/>
            <PrivateRoute exact path='/orders/:id' component={OrderDetailsPage}/>
            <PrivateRoute exact path='/orders/:id/edit' component={EditOrder}/>
            <PrivateRoute exact path='/organizations/:id' component={OrganizationDetailsPage}/>
            <PrivateRoute exact path='/chat' component={ChatWrapper}/>
            <PrivateRoute exact path='/organizations/:id/edit' component={EditOrganization}/>
            <PrivateRoute exact path='/create-abstract-product' component={CreateAbstractProductPage}/>
            <PrivateRoute exact path='/abstract-products' component={AbstractProductsPage}/>
            <PrivateRoute exact path='/abstract-products/:id' component={AbstractProductDetailsPage}/>
            <PrivateRoute exact path='/abstract-products/:id/edit' component={EditAbstractProduct}/>
            <PrivateRoute exact path='/create-product' component={CreateProduct}/>
            <PrivateRoute exact path='/products' component={ProductsPage}/>
            <PrivateRoute exact path='/products/:id' component={ProductDetailsPage}/>
            <PrivateRoute exact path='/products/:id/edit' component={EditProduct}/>
            <PrivateRoute exact path='/create-product-type' component={CreateProductTypeWithAttributes}/>
            <PrivateRoute exact path='/product-types/' component={ProductTypesPage}/>
            <PrivateRoute exact path='/product-types/:id' component={ProductTypeDetailsPage}/>
            <PrivateRoute exact path='/product-types/:id/edit' component={EditProductTypeWithAttributes}/>
            <PrivateRoute exact path='/notifications' component={NotificationPage}/>
            <Route exact path='/restore-password/:token' component={RestorePassword}/>
            <Route exact path='/forgot-password' component={ForgotPassword}/>
            <Route exact path='/create-organization' component={CreateOrganization}/>
        </Router>
    );
};
