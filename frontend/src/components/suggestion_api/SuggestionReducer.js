import {
  GET_SUGGESTION,
  GET_SUGGESTIONS,
  ADD_SUGGESTION,
  UPDATE_SUGGESTION,
} from "./SuggestionTypes";

const initialState = {
  suggestions: [],
};

export const suggestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUGGESTION:
      return {
        ...state,
        suggestions: [action.payload],
      };
    case GET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload,
      };
    case ADD_SUGGESTION:
      return {
        ...state,
        suggestions: [...state.suggestions, action.payload],
      };
    case UPDATE_SUGGESTION:
      state.suggestions.filter((x) => x.is_active === true);
      return {
        ...state,
      };
    default:
      return state;
  }
};
