import { STORE_FETCH_DETAIL, STORE_FETCH_NEARBY } from "../actions/actionTypes";

const initialState = {
    storeDetail: "",
    storesNearby: []
};

export default function storeReducer(state = initialState, action) {
  if (action.type === STORE_FETCH_DETAIL) {
    return {
      ...state,
      storeDetail: action.payload,
    }
  }
  if (action.type === STORE_FETCH_NEARBY) {
    return {
      ...state,
      storesNearby: action.payload,
    }
  }
  return state;
}
