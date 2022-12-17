import { GET_OPINION, GET_OPINIONS, ADD_OPINION } from "./OpinionTypes";

const initialState = {
  opinions: [],
};

export const opinionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OPINION:
      return {
        ...state,
        opinions: [action.payload],
      };
    case GET_OPINIONS:
      return {
        ...state,
        opinions: action.payload,
      };
    case ADD_OPINION:
      return {
        ...state,
        opinions: [...state.opinions, action.payload],
      };
    default:
      return state;
  }
};
