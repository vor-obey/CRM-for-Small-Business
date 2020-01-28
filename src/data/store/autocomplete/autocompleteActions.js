import {
    SET_CITY,
    SET_WAREHOUSE
} from "./autocompleteActionTypes";

export const setCity = city => {
  return {
      type: SET_CITY,
      city
  }
};
export const setWarehouse = warehouse => {
  return {
      type: SET_WAREHOUSE,
      warehouse
  }
};