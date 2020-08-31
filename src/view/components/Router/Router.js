import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
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
import {MessageTemplatePage} from "../../pages/MessageTemplatePage/MessageTemplatePage";
import {CreateMessageTemplate} from "../../pages/CreateMessageTemplate/CreateMessageTemplate";
import {
    CHAT, CHAT_TEMPLATES, CHAT_TEMPLATES_CREATE,
    CUSTOMER_PAGE,
    CUSTOMERS,
    CUSTOMERS_CREATE,
    CUSTOMERS_EDIT,
    DASHBOARD, NOTIFICATIONS,
    ORDER_PAGE,
    ORDERS,
    ORDERS_CREATE,
    ORDERS_EDIT,
    PRODUCT_PAGE,
    PRODUCT_TEMPLATES,
    PRODUCT_TEMPLATES_CREATE,
    PRODUCT_TEMPLATES_EDIT,
    PRODUCT_TEMPLATES_PAGE,
    PRODUCT_TYPE_PAGE,
    PRODUCT_TYPES,
    PRODUCT_TYPES_CREATE, PRODUCT_TYPES_EDIT,
    PRODUCTS,
    PRODUCTS_CREATE,
    PRODUCTS_EDIT,
    USER_PAGE,
    USERS,
    USERS_CREATE,
    USERS_EDIT
} from "../../../constants/routes";
import Drawer from "../Navigation/Drawer/Drawer";
import {Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 86,
        background: '#f8f8f8'
    }
}))

export const Routing = () => {
    const classes = useStyles();
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
        <div className={classes.root}>
            <BrowserRouter history={history}>
                <Drawer/>

                <Header/>
                {/*<DraggableChat/>*/}
                <Switch>
                    <PrivateRoute exact path="/" component={Login}/>
                    <PrivateRoute exact path={DASHBOARD} component={Home}/>

                    <PrivateRoute exact path={USERS_CREATE} component={CreateUser}/>
                    <PrivateRoute exact path={USERS_EDIT} component={EditUser}/>
                    <PrivateRoute exact path={USERS} component={UsersPage}/>
                    <PrivateRoute path={USER_PAGE} component={UserDetailsPage}/>

                    <PrivateRoute exact path={CUSTOMERS_CREATE} component={CreateCustomer}/>
                    <PrivateRoute exact path={CUSTOMERS_EDIT} component={EditCustomer}/>
                    <PrivateRoute exact path={CUSTOMERS} component={CustomersPage}/>
                    <PrivateRoute path={CUSTOMER_PAGE} component={CustomerDetailsPage}/>

                    <PrivateRoute exact path={ORDERS_CREATE} component={CreateOrderPage}/>
                    <PrivateRoute exact path={ORDERS_EDIT} component={EditOrder}/>
                    <PrivateRoute exact path={ORDERS} component={OrdersPage}/>
                    <PrivateRoute path={ORDER_PAGE} component={OrderDetailsPage}/>

                    <Route exact path='/create-organization' component={CreateOrganization}/>

                    <PrivateRoute exact path='/organizations/:id' component={OrganizationDetailsPage}/>
                    <PrivateRoute exact path='/organizations/:id/edit' component={EditOrganization}/>

                    <PrivateRoute exact path={PRODUCT_TEMPLATES_CREATE} component={CreateAbstractProductPage}/>
                    <PrivateRoute exact path={PRODUCT_TEMPLATES_EDIT} component={EditAbstractProduct}/>
                    <PrivateRoute exact path={PRODUCT_TEMPLATES} component={AbstractProductsPage}/>
                    <PrivateRoute path={PRODUCT_TEMPLATES_PAGE} component={AbstractProductDetailsPage}/>

                    <PrivateRoute exact path={PRODUCT_TYPES_CREATE} component={CreateProductTypeWithAttributes}/>
                    <PrivateRoute exact path={PRODUCT_TYPES_EDIT} component={EditProductTypeWithAttributes}/>
                    <PrivateRoute exact path={PRODUCT_TYPES} component={ProductTypesPage}/>
                    <PrivateRoute path={PRODUCT_TYPE_PAGE} component={ProductTypeDetailsPage}/>

                    <PrivateRoute exact path={PRODUCTS_CREATE} component={CreateProduct}/>
                    <PrivateRoute exact path={PRODUCTS_EDIT} component={EditProduct}/>
                    <PrivateRoute exact path={PRODUCTS} component={ProductsPage}/>
                    <PrivateRoute exact path={PRODUCT_PAGE} component={ProductDetailsPage}/>

                    <PrivateRoute exact path={NOTIFICATIONS} component={NotificationPage}/>

                    <PrivateRoute exact path={CHAT_TEMPLATES_CREATE} component={CreateMessageTemplate}/>
                    <PrivateRoute exact path={CHAT_TEMPLATES} component={MessageTemplatePage}/>
                    <PrivateRoute exact path={CHAT} component={ChatWrapper}/>

                    <Route exact path='/restore-password/:token' component={RestorePassword}/>
                    <Route exact path='/forgot-password' component={ForgotPassword}/>
                </Switch>
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
            </BrowserRouter>
        </div>
    );
};
