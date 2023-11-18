import { STORE_FETCH_DETAIL } from "../actions/actionTypes";

const initialState = {
    storeDetail: ""
};

export default function storeReducer(state = initialState, action) {
  if (action.type === STORE_FETCH_DETAIL) {
    return {
      ...state,
      storeDetail: action.payload,
    }
  }
  return state;
}
