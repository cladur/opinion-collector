import axios from "axios";
import { toast } from "react-toastify";

import { SET_PASSWORD, SET_PASSWORD_ERROR } from "./SettingsTypes";

export const setPassword = (userData) => (dispatch) => {
  axios
    .post("/api/users/set_password/", userData)
    .then((response) => {
      toast.success("Password changed succesfully.");
      dispatch({
        type: SET_PASSWORD,
        payload: response.data,
      });
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // toast.error(JSON.stringify(error.response.data));
        dispatch({
          type: SET_PASSWORD_ERROR,
          errorData: error.response.data,
        });
      } else if (error.message) {
        // the error message is available,
        // let's display it on error toast
        toast.error(JSON.stringify(error.message));
      } else {
        // strange error, just show it
        toast.error(JSON.stringify(error));
      }
    });
};
