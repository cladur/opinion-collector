import axios from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";
import {
  SET_PASSWORD,
  SET_PASSWORD_ERROR,
} from "./SettingsTypes";
import { setAxiosAuthToken, toastOnError } from "../../utils/Utils";

export const setPassword = (userData, redirectTo) => (dispatch) => {
    axios
      .post("/api/users/set_password", userData)
      .then((response) => {
        const { suchy_karaluch } = response.data;
        toastOnError(suchy_karaluch);
      })
      .catch((error) => {
        dispatch({
          type: SET_PASSWORD_ERROR,
          errorData: error.response.data,
        });
         toastOnError(error);
      });
  };
