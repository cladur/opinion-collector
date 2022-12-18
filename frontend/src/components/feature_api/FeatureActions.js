import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_FEATURE, GET_FEATURES, ADD_FEATURE } from "./FeatureTypes";

export const getFeature = (id) => (dispatch) => {
  axios
    .get("/api/features/" + id + "/")
    .then((response) => {
      dispatch({
        type: GET_FEATURE,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const getFeatures = (category, is_positive) => (dispatch) => {
  var category_query = "";
  if (category) {
    category_query = "category=" + category;
  }
  var is_positive_query = "";
  if (is_positive) {
    is_positive_query = "is_positive=" + is_positive;
  }
  axios
    .get("/api/features/?" + category_query + "&" + is_positive_query)
    .then((response) => {
      dispatch({
        type: GET_FEATURES,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const addFeature = (note) => (dispatch) => {
  console.log(note);
  axios
    .post("/api/features/", note, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: ADD_FEATURE,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};
