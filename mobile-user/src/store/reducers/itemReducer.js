import { DATA_FETCH_SUCCESS } from "../actions/actionTypes";

const defaultValue = {
  datas: [],
};

export default function itemReducer(state = defaultValue, action) {
  if (action.type === DATA_FETCH_SUCCESS) {
    return {
      ...state,
      datas: action.payload,
    };
  }
  return state;
}
