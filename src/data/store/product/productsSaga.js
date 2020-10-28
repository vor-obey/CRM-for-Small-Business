import {ProductService, ProductTypeService} from "../../../services";
import {put} from "@redux-saga/core/effects";
import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    EDIT_PRODUCT_SUCCESS,
    GET_PRODUCT_DETAILS_BY_ID_FAIL,
    GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_TYPES_FAIL,
    GET_PRODUCTS_TYPES_SUCCESS,
    CREATE_TEMPLATE_PRODUCT_SUCCESS,
    CREATE_TEMPLATE_PRODUCT_FAIL,
    GET_TEMPLATES_PRODUCTS_SUCCESS,
    GET_TEMPLATES_PRODUCTS_FAIL,
    DELETE_TEMPLATE_PRODUCT_SUCCESS,
    DELETE_TEMPLATE_PRODUCT_FAIL,
    SET_PRODUCT_TYPE_DETAILS_SUCCESS,
    SET_PRODUCT_TYPE_DETAILS_FAIL,
    SET_TEMPLATE_PRODUCT_DETAILS_SUCCESS,
    SET_TEMPLATE_PRODUCT_DETAILS_FAIL,
    EDIT_TEMPLATE_PRODUCT_FAIL,
    EDIT_TEMPLATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_TYPE_FAIL,
    CREATE_PRODUCT_TYPE_SUCCESS,
    DELETE_PRODUCT_TYPE_SUCCESS,
    DELETE_PRODUCT_TYPE_FAIL, EDIT_PRODUCT_TYPE_FAIL, EDIT_PRODUCT_TYPE_SUCCESS,
} from "./productActionTypes";
import {getListSaga} from "../helpers/sagaHelpers";
import {closeDialog, setIsLoading, setSnackBarStatus} from "../auxiliary/auxiliaryActions";
import {history} from "../../../utils/history";
import {setProductDetailsToStore} from "./productActions";
import {ORDERS_CREATE, PRODUCTS} from "../../../constants/routes";
import {COMMON_ERROR_MESSAGE} from "../../../constants/statuses";
import AbstractProductService from "../../../services/AbstractProductService";
import {useImperativeHandle} from "react";

export const getProducts = getListSaga(ProductService, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL)

export function* createProductType(action) {
    try {
        const {name, attributes} = action.payload;
        yield put(setIsLoading(true));
        const response = yield ProductTypeService.create({
            name,
            attributes
        });
        const {organization, ...res} = response;
        console.log(res)
        yield put({type: CREATE_PRODUCT_TYPE_SUCCESS, payload: res})
    } catch (e) {
        yield put({type: CREATE_PRODUCT_TYPE_FAIL});
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* getProductsTypes() {
    try {
        yield put(setIsLoading(true));
        const response = yield ProductTypeService.list();
        yield put({type: GET_PRODUCTS_TYPES_SUCCESS, payload: response})
    } catch (e) {
        yield put({type: GET_PRODUCTS_TYPES_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* editProductType(action) {
    try {
        console.log(action.payload)
        const {id, name, newAttributes} = action.payload;
        yield put(setIsLoading(true));
        yield ProductTypeService.update({
            productTypeId: id,
            name,
            attributes: newAttributes,
        });
        yield put({type: EDIT_PRODUCT_TYPE_SUCCESS, payload: {name, id}})

    } catch (e) {
        yield put({type: EDIT_PRODUCT_TYPE_FAIL});
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* getProductDetailById(action) {
    try{
        yield put(setIsLoading(true));
        const response = yield ProductService.findOneById(action.payload);
        yield put({type: GET_PRODUCT_DETAILS_BY_ID_SUCCESS, payload: response})
    } catch (e) {
        yield put({type: GET_PRODUCT_DETAILS_BY_ID_FAIL});
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* deleteProduct(action) {
    try {
        const id = action.payload;
        yield put(setIsLoading(true));
        yield ProductService.delete(id);
        yield put({type: DELETE_PRODUCT_SUCCESS, payload: id})
        yield put(closeDialog());
        history.goBack()
    } catch (e) {
        yield put({type: DELETE_PRODUCT_FAIL});
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* createProduct(action) {
    try {
        const { selectedAttributeValues, productDetails, selectedAbstractProduct, selectedProductType} = action.payload.data;
        const history = action.payload.history;

        yield put(setIsLoading(true));
        const response = yield ProductService.create({
            abstractProductId: selectedAbstractProduct?.abstractProductId,
            productTypeId: selectedProductType.productTypeId,
            name: productDetails.name,
            price: productDetails.price,
            attributeValues: selectedAttributeValues,
        });
        yield put({type: CREATE_PRODUCT_SUCCESS, payload: response});
        yield put(setProductDetailsToStore({name: '', price: ''}));
        //TODO переписать на колбэк
        if (history.location.state !== undefined && !history.location.state.editOrder) {
            history.push(ORDERS_CREATE, {
                response
            });
        } else {
            history.push(PRODUCTS);
        }
    } catch (e) {
        yield put({type: CREATE_PRODUCT_FAIL});
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* editProduct(action) {
    try {
        const {id, data} = action.payload;
        const {
            selectedAttributeValues,
            productDetails,
            selectedAbstractProduct,
            selectedProductType
        } = data;
        const newDate = {
            productId: id,
            abstractProductId: selectedAbstractProduct.abstractProductId,
            productTypeId: selectedProductType.productTypeId,
            name: productDetails.name,
            price: productDetails.price,
            attributeValues: selectedAttributeValues
        }

        yield put(setIsLoading(true));
        const response = yield ProductService.update(newDate);

        if(!response.success){
            yield put(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
        }

        yield put({type: EDIT_PRODUCT_SUCCESS, payload: newDate});
        yield put(setProductDetailsToStore({name: '', price: ''}));
        history.goBack();
    } catch (e) {
        yield put({type: EDIT_PRODUCT_FAIL});
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* deleteProductType(action) {
    try {
        yield put(setIsLoading(true));
        const response = yield ProductTypeService.delete(action.payload);
        console.log(action.payload);
        if (response.success) {
            yield put({type: DELETE_PRODUCT_TYPE_SUCCESS, payload: action.payload})
            history.goBack();
        } else {
            yield put(setSnackBarStatus({isOpen: true, message: response.message, success: false}));
        }
        yield put(closeDialog());
    } catch (e) {
        yield put({type: DELETE_PRODUCT_TYPE_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: COMMON_ERROR_MESSAGE, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* createTemplateProduct(action) {
    try {
        const {data, onSubmitted} = action.payload;
        console.log(data)
        const {productTypeId, abstractProductDetails} = data;
        yield put(setIsLoading(true));
        const {abstractProductId} = yield AbstractProductService.create({
            productTypeId,
            name: abstractProductDetails.name,
            price: abstractProductDetails.price,
            description: abstractProductDetails.description,
        });
        yield put({type: CREATE_TEMPLATE_PRODUCT_SUCCESS, payload: {...abstractProductDetails, productTypeId, abstractProductId}})
        onSubmitted(abstractProductId);
    } catch (e) {
        yield put({type: CREATE_TEMPLATE_PRODUCT_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* deleteTemplateProduct(action) {
    try {
        const{ id, onSuccessfullyDeleted } = action.payload;
        yield put(setIsLoading(true));
        yield AbstractProductService.delete(id);
        yield put({type: DELETE_TEMPLATE_PRODUCT_SUCCESS, payload: id})
        onSuccessfullyDeleted()
    } catch (e) {
        yield put({type: DELETE_TEMPLATE_PRODUCT_FAIL})
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* getTemplatesProducts() {
    try {
        yield put(setIsLoading(true));
        const response = yield AbstractProductService.list();
        yield put({type: GET_TEMPLATES_PRODUCTS_SUCCESS, payload: response});
    } catch (e) {
        yield put({type: GET_TEMPLATES_PRODUCTS_FAIL});
        yield put(setSnackBarStatus({isOpen: false, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* setProductTypesDetails(action) {
    try {
        yield put(setIsLoading(true));
        const response = yield ProductTypeService.findOneById(action.payload);
        yield put({type: SET_PRODUCT_TYPE_DETAILS_SUCCESS, payload: response});
    } catch (e) {
        yield put({type: SET_PRODUCT_TYPE_DETAILS_FAIL});
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* setTemplateProductDetails(action) {
    try {
        yield put(setIsLoading(true));
        const response = yield AbstractProductService.findOneById(action.payload);
        yield put({type: SET_TEMPLATE_PRODUCT_DETAILS_SUCCESS, payload: response});
    } catch (e) {
        yield put({type: SET_TEMPLATE_PRODUCT_DETAILS_FAIL});
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));
    }
}

export function* editTemplateProduct(action) {
    try {
        const {id, data, onEditSuccessfully} = action.payload;
        const {productTypeId, abstractProductDetails} = data;
        yield put(setIsLoading(true));
        yield AbstractProductService.update({
            abstractProductId: id,
            productTypeId,
            name: abstractProductDetails.name,
            price: abstractProductDetails.price,
            description: abstractProductDetails.description,
        });
        yield put({type: EDIT_TEMPLATE_PRODUCT_SUCCESS, payload: {data, id}});
        onEditSuccessfully();
    } catch (e) {
        yield put({type: EDIT_TEMPLATE_PRODUCT_FAIL});
        yield put(setSnackBarStatus({isOpen: true, message: e.message, success: false}));
    } finally {
        yield put(setIsLoading(false));

    }
}
