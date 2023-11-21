import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { fetchCartUser } from "../store/actions/actionCreators";
import OrderTable from "../components/OrderTable";

const StoreScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCartUser());
      } catch (error) {
        console.error("Error getting location:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const cart = useSelector((state) => state.cartReducer.cartByUser);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons
          name="md-chevron-back-circle"
          size={40}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.heading}>Order Histories</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <OrderTable orderHistories={cart} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10, 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 60,
    color: '#1E241E',
  },
});

export default StoreScreen;
