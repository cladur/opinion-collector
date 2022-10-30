import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_PRODUCTS, ADD_PRODUCT } from "./ProductsTypes";

export const getProducts = () => (dispatch) => {
  axios
    .get("/api/products/")
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
  axios
    .post("/api/products/", note)
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
