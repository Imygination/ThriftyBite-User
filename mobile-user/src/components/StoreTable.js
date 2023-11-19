import React from "react";
import { View, Image, Text, StyleSheet, Button } from "react-native";
import {addCartFood} from "../store/actions/actionCreators";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreTable = (props) => {
  const food = props.foods;
  const dispatch = useDispatch();

  const addCartHandler = async () => {
    try {
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
        price: food.price,
        itemPrice: food.price,
      };
      dispatch(addCartFood(cartData));
      // console.log(cartData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: food.imageUrl,
        }}
        style={styles.storeImage}
      />
      <View style={styles.textColumn}>
        <View style={styles.textFlexColumn}>
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.foodPrice}>Rp. {food.price}</Text>
        </View>
        <View style={styles.buttonFlexColumn}>
          <Button 
          onPress={addCartHandler}
          title="Order" color="#5db075" style={styles.orderButton} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderColor: "white",
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
  },
  storeImage: {
    flex: 1,
    width: 125,
    height: 125,
    borderRadius: 18,
  },
  textColumn: {
    flex: 1,
    padding: 10,
  },
  foodName: {
    fontFamily: "serif",
    fontSize: 17,
    textAlign: "center",
  },
  foodPrice: {
    fontFamily: "serif",
    fontSize: 14,
    textAlign: "center",
  },
  orderButton: {
    flex: 1,
    alignSelf: "flex-end",
    backgroundColor: "blue",
  },
  textFlexColumn: {
    flex: 2,
    justifyContent: "flex-start",
  },
  buttonFlexColumn: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default StoreTable;
