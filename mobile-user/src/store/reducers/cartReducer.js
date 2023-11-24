import { ADD_CART_FOOD, MINUS_CART_FOOD, RESET_CART_FOOD, FETCH_CART_FOOD } from "../actions/actionTypes";

const initialState = {
  cart: [],
  cartByUser: [],
};

export default function cartReducer(state = initialState, action) {
  if (action.type === ADD_CART_FOOD) {
    const found = state.cart.findIndex(
      (element) => element.foodId === action.payload.foodId
    );
    if (state.cart.length > 0) {
      if (state.cart[0].StoreId !== action.payload.StoreId) {
        console.log("From different store")
        throw {message: "Cannot add item from different store"}
      }
    }
    if (found > -1) {
      // console.log(state.cart[found].count, state.cart[found].stock);
      if (state.cart[found].count < state.cart[found].stock) {
        state.cart[found].count++;
        state.cart[found].price += state.cart[found].itemPrice;
      }
    } else {
      state.cart.push(action.payload);
    }
  }

  if (action.type === MINUS_CART_FOOD) {
    const found = state.cart.findIndex(
      (element) => element.foodId === action.payload.foodId
    );
    //di lebihi 1 karena data yang terbaca belum ke update yang setelah di kurangin
    if (state.cart[found].count > 1) {
      state.cart[found].count--;
      state.cart[found].price -= state.cart[found].itemPrice;
    } else {
      state.cart.splice(found, 1);
    }
    console.log(found);
  }

  if (action.type === RESET_CART_FOOD) {
    console.log("cart reset")
    return {...state, cart: []}
  }

  if (action.type === FETCH_CART_FOOD) {
    return {
      ...state,
      cartByUser: action.payload,
    }
  }
  return state;
}
