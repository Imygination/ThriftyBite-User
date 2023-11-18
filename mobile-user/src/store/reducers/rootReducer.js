import { combineReducers } from "redux";
import foodReducer from "./foodReducer";
import storeReducer from "./storeReducer"

const rootReducer = combineReducers({
  foodReducer,
  storeReducer
});

export default rootReducer;
