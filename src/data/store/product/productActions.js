import {
    GET_PRODUCTS_TYPES,
    GET_PRODUCTS,
    SET_PRODUCT_DETAILS,
    GET_PRODUCT_DETAILS_BY_ID,
    CLEAN_PRODUCT_DETAILS,
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT_TYPE,
    CREATE_TEMPLATE_PRODUCT,
    GET_TEMPLATES_PRODUCTS,
    DELETE_TEMPLATE_PRODUCT,
    SET_PRODUCT_TYPE_DETAILS,
    CLEAN_PRODUCT_TYPE_DETAILS,
    SET_TEMPLATE_PRODUCT_DETAILS,
    CLEAN_PRODUCT_TEMPLATE_DETAILS,
    EDIT_TEMPLATE_PRODUCT,
    CREATE_PRODUCT_TYPE,
    EDIT_PRODUCT_TYPE,
    SET_ATTRIBUTES_TO_STATE,
    CLEAN_ATTRIBUTES,
    SET_PRODUCT_TYPE_TO_STATE, DELETE_ATTRIBUTE, EDIT_ATTRIBUTE, CREATE_ATTRIBUTE
} from "./productActionTypes";
import {createAction} from "../helpers/reduxHelpers";

export const setProductDetailsToStore = (details) => ({type: SET_PRODUCT_DETAILS, details});

export const getProducts = createAction(GET_PRODUCTS);

export const getProductsTypes = () => ({type: GET_PRODUCTS_TYPES});

export const getProductDetailsById = (id) => ({type: GET_PRODUCT_DETAILS_BY_ID, payload: id})

export const cleanProductDetails = () => ({type: CLEAN_PRODUCT_DETAILS});

export const deleteProduct = (id) => ({type: DELETE_PRODUCT, payload: id});

export const createProduct = (details) => ({type: CREATE_PRODUCT, payload: details});

export const editProduct = (details) => ({type: EDIT_PRODUCT, payload: details});

export const deleteProductType = (details) => ({type: DELETE_PRODUCT_TYPE, payload: details});

export const createTemplateProduct = (details) => ({type: CREATE_TEMPLATE_PRODUCT, payload: details});

export const getTemplatesProducts = () => ({type: GET_TEMPLATES_PRODUCTS});

export const deleteTemplateProduct = (id) => ({type: DELETE_TEMPLATE_PRODUCT, payload: id}) ;

export const setProductTypeDetails = (id) => ({type: SET_PRODUCT_TYPE_DETAILS, payload: id});

export const cleanProductTypeDetails = () => ({type: CLEAN_PRODUCT_TYPE_DETAILS});

export const setTemplateProductDetails = (details) => ({type: SET_TEMPLATE_PRODUCT_DETAILS, payload: details});

export const cleanProductTemplateDetails = () => ({type: CLEAN_PRODUCT_TEMPLATE_DETAILS});

export const editTemplateProduct = (details) => ({type: EDIT_TEMPLATE_PRODUCT, payload: details});

export const createProductType = (details) => ({type: CREATE_PRODUCT_TYPE, payload: details});

export const editProductType = (details) => ({type: EDIT_PRODUCT_TYPE, payload: details});

export const setAttributesToState = (id) => ({type: SET_ATTRIBUTES_TO_STATE, payload: id});

export const cleanAttributes = () => ({type: CLEAN_ATTRIBUTES});

export const setProductTypeToState = (details) => ({type: SET_PRODUCT_TYPE_TO_STATE, payload: details});

export const createAttribute = (details) => ({type: CREATE_ATTRIBUTE, payload: details});

export const editAttribute = (details) => ({type: EDIT_ATTRIBUTE, payload: details});

export const deleteAttribute = (details) => ({type: DELETE_ATTRIBUTE, payload: details});