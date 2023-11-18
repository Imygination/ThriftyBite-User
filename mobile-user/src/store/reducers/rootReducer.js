import { combineReducers } from "redux";
import foodReducer from "./foodReducer";
import cartReducer from "./cartReducer";
import storeReducer from "./storeReducer";

const rootReducer = combineReducers({
  foodReducer,
  cartReducer,
  storeReducer,
});

export default rootReducer;
