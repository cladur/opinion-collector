import { GET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY } from "./CategoryTypes";

const initialState = {
  categories: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case UPDATE_CATEGORY:
      var foundIndex = state.categories.findIndex(
        (x) => x.id === action.payload.id
      );
      state.categories[foundIndex] = action.payload;
      return state;
    default:
      return state;
  }
};
