import {ProductService} from "../../../services";
import {GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS} from "./productActionTypes";
import {getListSaga} from "../helpers/sagaHelpers";

export const getProducts = getListSaga(ProductService, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL)
