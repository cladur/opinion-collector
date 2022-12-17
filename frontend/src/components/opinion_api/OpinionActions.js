import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_OPINION, GET_OPINIONS, ADD_OPINION } from "./OpinionTypes";

export const getOpinion = (id) => (dispatch) => {
  axios
    .get("/api/opinions/" + id + "/")
    .then((response) => {
      dispatch({
        type: GET_OPINION,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const getOpinions = (product_id) => (dispatch) => {
  axios
    .get("/api/opinions/?product=" + product_id)
    .then((response) => {
      dispatch({
        type: GET_OPINIONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const addOpinion = (note) => (dispatch) => {
  console.log(note);
  axios
    .post("/api/opinions/", note, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: ADD_OPINION,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};
