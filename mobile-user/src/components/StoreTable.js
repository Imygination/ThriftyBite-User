import React from "react";
import { View, Image, Text, StyleSheet, Button } from "react-native";

const StoreTable = () => (
  <View style={styles.container}>
    <Image
      source={{
        uri: "https://omni.harvestcakes.com/media/thumb/product_photo/2023/7/4/k9osszjhn2bp96ouw49q5f_size_480.jpg",
      }}
      style={styles.storeImage}
    />
    <View style={styles.textColumn}>
      <View style={styles.textFlexColumn}>
        <Text style={styles.foodName}>HarvestCake</Text>
        <Text style={styles.foodPrice}>350000</Text>
      </View>
      <View style={styles.buttonFlexColumn}>
        <Button title="Order" color="#5db075" style={styles.orderButton} />
      </View>
    </View>
  </View>
);

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
