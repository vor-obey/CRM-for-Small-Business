import {
    CLEAN_PRODUCT_DETAILS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    EDIT_PRODUCT_SUCCESS,
    GET_PRODUCT_DETAILS_BY_ID_FAIL,
    GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
    GET_PRODUCTS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_TYPES_FAIL,
    GET_PRODUCTS_TYPES_SUCCESS,
    SET_PRODUCT_DETAILS,
    DELETE_PRODUCT_TYPE_SUCCESS,
    DELETE_PRODUCT_TYPE_FAIL,
    CREATE_TEMPLATE_PRODUCT_FAIL,
    GET_TEMPLATES_PRODUCTS_SUCCESS,
    GET_TEMPLATES_PRODUCTS_FAIL,
    DELETE_TEMPLATE_PRODUCT_SUCCESS,
    DELETE_TEMPLATE_PRODUCT_FAIL,
    SET_PRODUCT_TYPE_DETAILS_SUCCESS,
    SET_PRODUCT_TYPE_DETAILS_FAIL,
    CLEAN_PRODUCT_TYPE_DETAILS,
    SET_TEMPLATE_PRODUCT_DETAILS_SUCCESS,
    SET_TEMPLATE_PRODUCT_DETAILS_FAIL,
    CLEAN_PRODUCT_TEMPLATE_DETAILS,
    EDIT_TEMPLATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_TYPE_SUCCESS,
    CREATE_PRODUCT_TYPE_FAIL,
    EDIT_PRODUCT_TYPE_SUCCESS,
    SET_ATTRIBUTES_TO_STATE_SUCCESS,
    CLEAN_ATTRIBUTES,
    SET_PRODUCT_TYPE_TO_STATE,

} from "./productActionTypes";
import {AsyncState} from "../helpers/reduxHelpers";

const initialState = {
   details: {
       name: '',
       price: ''
   },
    productsStatus: new AsyncState(),
    productsTypes: [],
    productTypeDetails: null,
    products: [],
    productDetails: null,
    productsTemplates: [],
    productTemplateDetails: null,
    attributes: null
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT_DETAILS: {
            return {
                ...state,
                details: {
                    ...state.details,
                    ...action.details
                }
            }
        }
        case GET_PRODUCTS:
            return {
                ...state,
                productsStatus: new AsyncState(true, false, false)
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                productsStatus: new AsyncState(false, true, false)
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case GET_PRODUCTS_TYPES_SUCCESS:
            return {
                ...state,
                productsTypes: action.payload,
            }
        case GET_PRODUCTS_TYPES_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case SET_PRODUCT_TYPE_TO_STATE:
            return {
                ...state,
                productsTypes: [...state.productsTypes, action.payload]
            }
        case GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            return {
                ...state,
                productDetails: action.payload,
            }
        case GET_PRODUCT_DETAILS_BY_ID_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case DELETE_PRODUCT_SUCCESS:
            const products = [...state.products];
            return {
                ...state,
                products: products.filter(prod => prod.productId !== action.payload)
            }
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case CREATE_PRODUCT_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case EDIT_PRODUCT_SUCCESS:
            const productsAll = [...state.products];
            const  productsIndex = productsAll.findIndex(el => el.productId === action.payload.productId);

            if (productsIndex !== -1) {
                productsAll[productsIndex] = {...productsAll[productsIndex] ,...action.payload };
            }
            return {
                ...state,
                products: productsAll
            }
        case DELETE_PRODUCT_TYPE_SUCCESS:
            const productsTypes = [...state.productsTypes];
            return {
                ...state,
                productsTypes: productsTypes.filter(el => el.productTypeId !== action.payload)
            }
        case DELETE_PRODUCT_TYPE_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case CREATE_TEMPLATE_PRODUCT_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case GET_TEMPLATES_PRODUCTS_SUCCESS:
            return {
                ...state,
                productsTemplates: action.payload
            }
        case GET_TEMPLATES_PRODUCTS_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case DELETE_TEMPLATE_PRODUCT_SUCCESS:
            const templates = [...state.productsTemplates];
            return {
                ...state,
                productsTemplates: templates.filter(el => el.abstractProductId !== action.payload)
            }
        case DELETE_TEMPLATE_PRODUCT_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case SET_PRODUCT_TYPE_DETAILS_SUCCESS:
            return {
                ...state,
                productTypeDetails: action.payload
            }
        case SET_PRODUCT_TYPE_DETAILS_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case SET_TEMPLATE_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                productTemplateDetails: action.payload
            }
        case SET_TEMPLATE_PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case EDIT_TEMPLATE_PRODUCT_SUCCESS:
            const productsTemplatesAll = [...state.productsTemplates];
            const productTemplateIndex = productsTemplatesAll.findIndex(el => el.abstractProductId === action.payload.id);

            if (productTemplateIndex !== -1) {
                productsTemplatesAll[productTemplateIndex] = {...productsTemplatesAll[productTemplateIndex] ,...action.payload.data.abstractProductDetails };
            }
            return {
                ...state,
                productsTemplates: productsTemplatesAll
            }
        case CREATE_PRODUCT_TYPE_SUCCESS:
            return {
                ...state,
                productsTypes: [...state.productsTypes, action.payload]
            }
        case CREATE_PRODUCT_TYPE_FAIL:
            return {
                ...state,
                productsStatus: new AsyncState(false, false, true)
            }
        case EDIT_PRODUCT_TYPE_SUCCESS:
            const productsTypesAll = [...state.productsTypes];
            const productIndex = productsTypesAll.findIndex(el => el.productTypeId === action.payload.id);

            if(productIndex !== -1){
                productsTypesAll[productIndex] = {...productsTypesAll[productIndex] ,...action.payload};
            }

            return {
                ...state,
                productsTypes: productsTypesAll
            }
        case SET_ATTRIBUTES_TO_STATE_SUCCESS:
            return {
                ...state,
                attributes: action.payload
            }
        case CLEAN_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: null
            }
        case CLEAN_PRODUCT_TYPE_DETAILS:
            return {
                ...state,
                productTypeDetails: null
            }
        case CLEAN_PRODUCT_TEMPLATE_DETAILS:
            return {
                ...state,
                productTemplateDetails: null
            }
        case CLEAN_ATTRIBUTES:
            return {
                ...state,
                attributes: null
            }
        default: {
            return state
        }
    }
};
