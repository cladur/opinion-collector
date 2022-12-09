import axios from "axios";
import { SET_PASSWORD, SET_PASSWORD_ERROR } from "./SettingsTypes";
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";

export const setPassword = (userData, redirectTo) => (dispatch) => {
  axios
    .post("/api/users/set_password", userData)
    .then((response) => {
      const { error } = response.data;
      toastOnError(error);
    })
    .catch((error) => {
      dispatch({
        type: SET_PASSWORD_ERROR,
        errorData: error.response.data,
      });
      toastOnError(error);
    });
};
