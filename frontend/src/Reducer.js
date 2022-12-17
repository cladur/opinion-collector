import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";
import { productsReducer } from "./components/product_api/ProductsReducer";
import { opinionsReducer } from "./components/opinion_api/OpinionReducer";
import { categoryReducer } from "./components/category_api/CategoryReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    products: productsReducer,
    opinions: opinionsReducer,
    categories: categoryReducer,
  });

export default createRootReducer;
