import {
    SET_CITY, SET_WAREHOUSE
} from "./autocompleteActionTypes";

const initialState = {
    city: {},
    warehouse: {}
};

export const autocompleteReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_CITY: {
          return {
              ...state,
              city: action.city
          }
      }
      case SET_WAREHOUSE: {
          return {
              ...state,
              warehouse: action.warehouse
          }
      }
      default: {
          return state;
      }
  }
};