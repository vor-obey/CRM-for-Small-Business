import {SET_IS_LOADING} from "./auxiliaryActionTypes";

const initialState = {
  isLoading: false
};

export const auxiliaryReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_IS_LOADING: {
          return {
              ...state,
              isLoading: action.isLoading
          }
      }
      default: {
          return state
      }
  }
};
