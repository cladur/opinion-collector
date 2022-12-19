import {
  GET_PRODUCT,
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
} from "./ProductsTypes";

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        products: [action.payload],
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: [action.payload],
      };
    default:
      return state;
  }
};
