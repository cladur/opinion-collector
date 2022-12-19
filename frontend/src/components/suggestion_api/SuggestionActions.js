import axios from "axios";
import { toast } from "react-toastify";
import { toastOnError } from "../../utils/Utils";
import {
  GET_SUGGESTION,
  GET_SUGGESTIONS,
  ADD_SUGGESTION,
  UPDATE_SUGGESTION,
} from "./SuggestionTypes";

export const getSuggestion = (id) => (dispatch) => {
  axios
    .get("/api/suggestions/" + id + "/")
    .then((response) => {
      dispatch({
        type: GET_SUGGESTION,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const getSuggestions = () => (dispatch) => {
  axios
    .get("/api/suggestions/?is_active=True")
    .then((response) => {
      dispatch({
        type: GET_SUGGESTIONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const addSuggestion = (note) => (dispatch) => {
  axios
    .post("/api/suggestions/", note, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: ADD_SUGGESTION,
        payload: response.data,
      });
      toast.success("Suggestion added successfully.");
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const updateSuggestion = (id, note) => (dispatch) => {
  axios
    .patch("/api/suggestions/" + id + "/", note)
    .then((response) => {
      dispatch({
        type: UPDATE_SUGGESTION,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};
