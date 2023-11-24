import { Axios } from "../../helpers/axios";
import {
  ADD_CART_FOOD,
  FOOD_FETCH_Detail,
  FOOD_FETCH_HOT_DEALS,
  MINUS_CART_FOOD,
  STORE_FETCH_NEARBY,
  STORE_FETCH_DETAIL,
  RESET_CART_FOOD,
  FETCH_CART_FOOD
} from "./actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export function addCartFood(payload) {
  return {
    type: ADD_CART_FOOD,
    payload,
  };
}

export function minusCartFood(payload) {
  return {
    type: MINUS_CART_FOOD,
    payload,
  };
}

export function resetCart() {
  return {
    type: RESET_CART_FOOD
  };
}

export function fetchNearbyFood(payload) {
  return {
    type: STORE_FETCH_NEARBY,
    payload,
  };
}

export function fetchStoreDetail(payload) {
  return {
    type: STORE_FETCH_DETAIL,
    payload,
  };
}

export function fetchUserCart(payload) {
  return {
    type: FETCH_CART_FOOD,
    payload,
  };
}

export const fetchDetailStore = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/stores/${id}`);
      const action = fetchStoreDetail(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchFoodHotDeals = (search) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get("/foods", {params: {search}});
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
      const { data } = await Axios.get("/foods/" + id);
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
      if (!body.email) {
        throw new Error("Email must be provided");
      }
      if (!body.password) {
        throw new Error("Password must be provided");
      }
      const { data } = await Axios.post("/login", body);
      await AsyncStorage.setItem("access_token", data.access_token);
      await AsyncStorage.setItem("userId", JSON.stringify(data.userId));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const registerSeller = (body) => {
  return async () => {
    try {
      if (!body.username) {
        throw new Error("Username must be provided");
      }
      if (!body.email) {
        throw new Error("Email must be provided");
      }
      if (!body.phoneNumber) {
        throw new Error("Phone number must be provided");
      }
      if (!body.password) {
        throw new Error("Password must be provided");
      }
      const { data } = await Axios.post("/register", body);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchFoodNearby = (params) => {
  const latitude = params.coords.latitude;
  const longitude = params.coords.longitude;
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(`/stores/location`, {
        params: {
          longitude,
          latitude,
        },
      });
      const action = fetchNearbyFood(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchOrder = (orderList) => {
  return async (dispatch) => {
    try {
      if (!orderList) {
        throw new Error("Order List Empty");
      }
      const token = await AsyncStorage.getItem("access_token");
      const { data } = await Axios.post(
        "/orders",
        { orderList },
        {
          headers: {
            access_token: token,
          },
        }
      );
      console.log(data);
      console.log("Success Fetch Order...");
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

  export const fetchCartUser = () => {
    return async (dispatch) => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const { data } = await Axios.get(
          "/orders",
          {
            headers: {
              access_token: token,
            },
          }
        );
        const action = fetchUserCart(data);
        dispatch(action);
      } catch (error) {
        console.log(error.response.data);
      }
    };
}

