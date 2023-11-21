import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderTable = ({ orderHistories }) => {
    console.log(orderHistories)
  return (
    <View>
      {orderHistories.map((order) => (
        <View key={order.id} style={styles.orderContainer}>
            <Text style={{color: '#1E241E'}}>Order Number: ThriftyBite_{order.id}</Text>
          <Text style={{color: '#1E241E'}}>Status: {order.status}</Text>
          <Text style={{color: '#1E241E'}}>Total Price: {order.totalPrice.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}</Text>
          <Text style={{color: '#1E241E'}}>Foods:</Text>
          <View style={styles.foodList}>
            {order.FoodOrders.map((food, index) => (
              <Text key={index}>- {food.Food.name}</Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    paddingLeft: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  foodList: {
    marginLeft: 15,
    color: '#1E241E',
  },
});

export default OrderTable;
