import { FOOD_FETCH_Detail, FOOD_FETCH_HOT_DEALS, FOOD_FETCH_NEARBY } from "../actions/actionTypes";

const initialState = {
  hotDealsFood: [],
  foodDetail: "",
  foodNearby: []
};

export default function foodReducer(state = initialState, action) {
  if (action.type === FOOD_FETCH_HOT_DEALS) {
    return {
      ...state,
      hotDealsFood: action.payload,
    }
  }
  if (action.type === FOOD_FETCH_Detail) {
    return {
      ...state,
      foodDetail: action.payload,
    }
  }
  if (action.type === FOOD_FETCH_NEARBY) {
    return {
      ...state,
      foodNearby: action.payload,
    }
  }
  return state;
}
