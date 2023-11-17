import { Axios } from "../../helpers/axios";
import { FOOD_FETCH_Detail, FOOD_FETCH_HOT_DEALS } from "./actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const {data} = await Axios.get("/foods");
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
      const {data} = await Axios.get("/foods/" + id);
      const action = fetchDetailFood(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loginSeller = (body) => {
    return async () => {
        try {
            if(!body.email) {
                throw new Error("Email must be provided")
            }
            if(!body.password) {
                throw new Error("Password must be provided")
            }
            const {data} = await Axios.post('/login',body)
            await AsyncStorage.setItem('access_token', data.access_token)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const registerSeller = (body) => {
    return async () => {
        try {
            if(!body.username) {
                throw new Error("Username must be provided")
            }
            if(!body.email) {
                throw new Error("Email must be provided")
            }
            if(!body.phoneNumber) {
                throw new Error("Phone number must be provided")
            }
            if(!body.password) {
                throw new Error("Password must be provided")
            }
            const {data} = await Axios.post('/register',body)
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}