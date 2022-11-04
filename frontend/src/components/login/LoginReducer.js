import {
  SET_TOKEN,
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  SET_CURRENT_USER_ERROR,
} from "./LoginTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  token: "",
  usernameError: "",
  passwordError: "",
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UNSET_CURRENT_USER:
      return initialState;
    case SET_CURRENT_USER_ERROR:
      const errorState = {
        usernameError: "",
        passwordError: "",
        isSubmitted: false,
      };
      if (action.errorData.hasOwnProperty("username")) {
        errorState.usernameError = action.errorData["username"];
      }
      if (action.errorData.hasOwnProperty("password")) {
        errorState.passwordError = action.errorData["password"];
      }
      return errorState;
    default:
      return state;
  }
};
