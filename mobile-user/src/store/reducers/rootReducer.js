import { combineReducers } from "redux";
import foodReducer from "./foodReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  foodReducer,
  cartReducer,
});

export default rootReducer;
