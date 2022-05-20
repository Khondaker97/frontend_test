import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import currencyReducer from "./currencyReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  categoryReducer,
  currencyReducer,
  cartReducer,
});
