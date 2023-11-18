import { combineReducers } from "redux";
import foodReducer from "./foodReducer";
import storeReducer from "./storeReducer"
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  foodReducer,
  storeReducer,
  cartReducer
});

export default rootReducer;
