import { FOOD_FETCH_Detail, FOOD_FETCH_HOT_DEALS, } from "../actions/actionTypes";

const initialState = {
  hotDealsFood: [],
  foodDetail: ""
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
  return state;
}
