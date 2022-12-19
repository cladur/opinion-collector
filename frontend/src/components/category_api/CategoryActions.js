import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY } from "./CategoryTypes";

export const getCategories = () => (dispatch) => {
  axios
    .get("/api/categories/?has_parent=False")
    .then((response) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const addCategory = (note) => (dispatch) => {
  console.log(note);
  axios
    .post("/api/categories/", note, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: ADD_CATEGORY,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const updateCategory = (id, note) => (dispatch) => {
  axios
    .patch("/api/categories/" + id + "/", note, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: UPDATE_CATEGORY,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};
