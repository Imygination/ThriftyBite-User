import { Dimensions, Image, TouchableHighlight, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import utility from "../style/utility,";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartFood,
  addCartFood,
  minusCartFood,
} from "../store/actions/actionCreators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import store from "../store";

export default function MainCard(props) {
  const dispatch = useDispatch();
  const food = props.foods;
  if (!food || food.length === 0) {
    return null;
  }
  // const cart = useSelector(function (state) {
  //   return state.cartReducer.cart;
  // });
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [counter, setCounter] = useState(0);

  const addCartHandler = async () => {
    try {
      setCounter(counter + 1);
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        navigation.navigate("LoginScreen");
        throw new Error("Need Login First...");
      }
      console.log("Add to Cart...");
      const cartData = {
        foodId: food.id,
        name: food.name,
        imageUrl: food.imageUrl,
        count: 1,
        stock: food.stock,
        price: food.price,
        itemPrice: food.price,
      };
      dispatch(addCartFood(cartData));

      const found = cart.findIndex((element) => element.foodId === food.id);
      setCartCount(cart[found].count);
      console.log(cart, cart.stock, counter);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setCart(store.getState().cartReducer.cart);
  }, [counter]);

  useEffect(() => {
    setCart(store.getState().cartReducer.cart);
  }, []);

  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ width: width * 0.3, height: height * 0.3 }}>
      <View
        style={[
          {
            backgroundColor: "#F0F4F3",
            flex: 1,
            borderRadius: 10,
            margin: 10,
            paddingBottom: 0,
            overflow: "hidden",
          },
          utility.shadow,
        ]}
      >
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor="white"
          onPress={() => navigation.navigate("StoreScreen", { StoreId: food.StoreId })}
          style={{ flex: 1 }}
        >
          <Image
            source={{
              uri: food.imageUrl,
            }}
            style={{ flex: 1, resizeMode: "contain" }}
          />
        </TouchableHighlight>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "transparent",
            margin: 5,
          }}
        >
          <Text>{food.name}</Text>
          <Text variant="titleMedium">Rp. {food.price}</Text>
          <Button
            mode="contained"
            buttonColor="#5db075"
            onPress={addCartHandler}
            // disabled={cartCount >= food.stock ? true : false}
          >
            <Text style={{ color: "white", fontSize: 10 }}>+ Keranjang</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
