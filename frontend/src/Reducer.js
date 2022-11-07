import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { signupReducer } from "./components/signup/SignupReducer";
import { loginReducer } from "./components/login/LoginReducer";
import { productsReducer } from "./components/product_api/ProductsReducer";
import { settingsReducer } from "./components/settings/SettingsReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    products: productsReducer,
  });

export default createRootReducer;
