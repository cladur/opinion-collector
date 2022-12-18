import { GET_FEATURE, GET_FEATURES, ADD_FEATURE } from "./FeatureTypes";

const initialState = {
  features: [],
};

export const featureReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEATURE:
      return {
        ...state,
        features: [action.payload],
      };
    case GET_FEATURES:
      return {
        ...state,
        features: action.payload,
      };
    case ADD_FEATURE:
      return {
        ...state,
        features: [...state.products, action.payload],
      };
    default:
      return state;
  }
};
