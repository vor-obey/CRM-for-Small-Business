import {
    CITY_SUGGESTIONS_LOADING,
    GET_CITY_SUGGESTIONS_FAILURE,
    GET_CITY_SUGGESTIONS_SUCCESS, GET_WAREHOUSE_SUGGESTIONS_FAILURE, GET_WAREHOUSE_SUGGESTIONS_SUCCESS,
    SET_CITY, SET_WAREHOUSE, WAREHOUSE_SUGGESTIONS_LOADING,
} from "./autocompleteActionTypes";

const initialState = {
    inputCityValue: '',
    inputWarehouseValue: '',
    citySuggestions: [],
    warehouseSuggestions: [],
    showCitySuggestions: true,
    showWarehouseSuggestions: true,
    isCityLoading: true,
    isWarehouseLoading: true,
    errorCityMessage: '',
    errorWarehouseMessage: ''
};

export const autocompleteReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_CITY_SUGGESTIONS_SUCCESS: {
          return {
              ...state,
              errorMessage: '',
              citySuggestions: action.citySuggestions
          }
      }
      case GET_CITY_SUGGESTIONS_FAILURE: {
          return {
              ...state,
              citySuggestions: [],
              errorCityMessage: action.errorCityMessage
          }
      }
      case GET_WAREHOUSE_SUGGESTIONS_SUCCESS: {
          return {
              ...state,
              errorWarehouseMessage: '',
              warehouseSuggestions: action.warehouseSuggestions
          }
      }
      case GET_WAREHOUSE_SUGGESTIONS_FAILURE: {
          return {
              ...state,
              warehouseSuggestions: [],
              errorWarehouseMessage: action.errorWarehouseMessage
          }
      }
      case SET_CITY: {
          return {
              ...state,
              inputCityValue: action.inputCityValue
          }
      }
      case SET_WAREHOUSE: {
          return {
              ...state,
              inputWarehouseValue: action.inputWarehouseValue
          }
      }
      case CITY_SUGGESTIONS_LOADING: {
          return {
              ...state,
              isCityLoading: action.isCityLoading
          }
      }
      case WAREHOUSE_SUGGESTIONS_LOADING: {
          return {
              ...state,
              isWarehouseLoading: action.isWarehouseLoading
          }
      }
      default: {
          return state;
      }
  }
};