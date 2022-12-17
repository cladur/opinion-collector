// import needed actions
import { SET_PASSWORD, SET_PASSWORD_ERROR } from "./SettingsTypes";

// define the initial state of the signup store
const initialState = {
  current_password: "",
  new_password: "",
};

// define how action will change the state of the store
export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PASSWORD:
      return {
        current_password: "",
        new_password: "",
      };
    case SET_PASSWORD_ERROR:
      const errorState = {
        current_password: "",
        new_password: "",
      };
      if (action.errorData.hasOwnProperty("current_password")) {
        errorState.current_password = action.errorData["current_password"];
      }
      if (action.errorData.hasOwnProperty("new_password")) {
        errorState.new_password = action.errorData["new_password"];
      }
      return errorState;
    default:
      return state;
  }
};
