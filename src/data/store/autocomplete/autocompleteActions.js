import {
    CITY_SUGGESTIONS_LOADING,
    GET_CITY_SUGGESTIONS_FAILURE,
    GET_CITY_SUGGESTIONS_SUCCESS,
    GET_WAREHOUSE_SUGGESTIONS_FAILURE,
    GET_WAREHOUSE_SUGGESTIONS_SUCCESS,
    SET_CITY,
    SET_WAREHOUSE, WAREHOUSE_SUGGESTIONS_LOADING
} from "./autocompleteActionTypes";

export const setInputCity = inputCityValue => {
  return {
      type: SET_CITY,
      inputCityValue
  }
};
export const setWarehouseCity = inputWarehouseValue => {
  return {
      type: SET_WAREHOUSE,
      inputWarehouseValue
  }
};

export const getCitySuggestionsSuccess = citySuggestions => {
    return {
        type: GET_CITY_SUGGESTIONS_SUCCESS,
        citySuggestions
    }
};

export const getCitySuggestionsFailure = errorCityMessage => {
    return {
        type: GET_CITY_SUGGESTIONS_FAILURE,
        errorCityMessage
    }
};

export const getWarehouseSuggestionsSuccess = warehouseSuggestions => {
    return {
        type: GET_WAREHOUSE_SUGGESTIONS_SUCCESS,
        warehouseSuggestions
    }
};

export const getWarehouseSuggestionsFailure = errorWarehouseMessage => {
    return {
        type: GET_WAREHOUSE_SUGGESTIONS_FAILURE,
        errorWarehouseMessage
    }
};

export const setIsCitySuggestionsLoading = isCityLoading => {
   return {
       type: CITY_SUGGESTIONS_LOADING,
       isCityLoading
   }
};

export const setIsWarehouseSuggestionsLoading = isWarehouseLoading => {
   return {
       type: WAREHOUSE_SUGGESTIONS_LOADING,
       isWarehouseLoading
   }
};