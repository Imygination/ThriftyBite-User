import { Axios } from "../../helpers/axios";
import { FOOD_FETCH_Detail, FOOD_FETCH_HOT_DEALS } from "./actionTypes";

export function fetchHotDealsFood(payload) {
  return {
    type: FOOD_FETCH_HOT_DEALS,
    payload,
  };
}

export function fetchDetailFood(payload) {
  return {
    type: FOOD_FETCH_Detail,
    payload,
  };
}

export const fetchFoodHotDeals = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.get("/foods");
      if (!response.ok) throw new Error("Something wrong!");
      const data = await response.json();
      const action = fetchHotDealsFood(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchFoodDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get("/foods/" + id);
      if (!response.ok) throw new Error("Something wrong!");
      const data = await response.json();
      const action = fetchDetailFood(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
