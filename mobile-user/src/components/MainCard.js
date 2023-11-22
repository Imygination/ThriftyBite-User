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
import ToastManager, { Toast } from 'toastify-react-native'

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
        StoreId: food.StoreId
      };
      dispatch(addCartFood(cartData));
      Toast.success("Added to cart")
      const found = cart.findIndex((element) => element.foodId === food.id);
      setCartCount(cart[found].count);
    } catch (error) {
      // console.log(error);
      Toast.error(error.message)
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
    <View style={{ width: width * 0.45, minHeight: 250 }}>
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
            style={{ width:'100%', height:150, resizeMode: "cover" }}
          />
        </TouchableHighlight>
        <View
          style={{
            justifyContent: "flex-end",
            backgroundColor: "transparent",
            margin: 5,
          }}
        >
          <Text style={{color:'#1E241E',marginBottom:5}}>{food.name}</Text>
          <Text style={{fontSize:15, color:'#1E241E', marginBottom:10}}>
            {food.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumSignificantDigits: 6
            })}
          </Text>
          <Button
            mode="contained"
            buttonColor="#5db075"
            onPress={addCartHandler}
            // disabled={cartCount >= food.stock ? true : false}
          >
            <Text style={{ color: "white", fontSize: 15 }}>+ Keranjang</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
