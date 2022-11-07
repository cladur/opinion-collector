import {
    SET_PASSWORD,
    SET_PASSWORD_ERROR
  } from "./SettingsTypes";

  const initialState = {
    oldPassword: "",
    newPassword: "",
  };

  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_PASSWORD:
        return {
          ...state,
          oldPassword: "",
          newPassword: "",
        };
      case SET_PASSWORD_ERROR:
        const errorState = {
          passwordError: "",
          oldPassword: "",
          newPassword: "",
        };
        return errorState;
      default:
        return state;
    }
  };
