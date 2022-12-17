import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_PRODUCT, GET_PRODUCTS, ADD_PRODUCT } from "./ProductsTypes";

export const getProduct = (id) => (dispatch) => {
  axios
    .get("/api/products/" + id + "/")
    .then((response) => {
      dispatch({
        type: GET_PRODUCT,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const getProducts = (name, category) => (dispatch) => {
  var name_query = "";
  if (name) {
    name_query = "name=" + name;
  }
  var category_query = "";
  if (category) {
    category_query = "category=" + category;
  }
  axios
    .get("/api/products/?" + name_query + "&" + category_query)
    .then((response) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};

export const addProduct = (note) => (dispatch) => {
  console.log(note);
  axios
    .post("/api/products/", note, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch({
        type: ADD_PRODUCT,
        payload: response.data,
      });
    })
    .catch((error) => {
      toastOnError(error);
    });
};
