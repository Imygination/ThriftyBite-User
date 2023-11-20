import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import StoreTable from "../components/StoreTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailStore } from "../store/actions/actionCreators";
import { useRoute } from "@react-navigation/native";
import ButtonChat from "../components/ButtonChat";
import { Ionicons } from "@expo/vector-icons";


const StoreScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const { StoreId } = useRoute().params;
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    try {
      dispatch(fetchDetailStore(StoreId));
    } catch (error) {
      console.error("Error getting location:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  const store = useSelector(function (state) {
    return state.storeReducer.storeDetail;
  });
  if (!store) {
    return <ActivityIndicator size="large" color="#5db075" />;
  }
  const foods = store.Food;
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Ionicons
        name="md-chevron-back-circle"
        size={40}
        color="black"
        style={{
          position: "absolute",
          zIndex: 99,
          opacity: 0.4,
          marginLeft: "5%",
        }}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.contentContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: store.location.coordinates[1],
            longitude: store.location.coordinates[0],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: store.location.coordinates[1],
              longitude: store.location.coordinates[0],
            }}
            title={store.name}
          />
        </MapView>
        <View style={styles.storeInfoContainer}>
          <Text style={styles.storeInfoText}>{store.name}</Text>
          <Text style={styles.storeInfoAddress}>{store.address}</Text>
          <ButtonChat StoreId={StoreId} />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#5db075" />
        ) : (
          foods.map((food) => <StoreTable foods={food} key={food.id} />)
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: 150,
    width: "100%",
    marginTop: "7%",
  },
  storeInfoContainer: {
    marginTop: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  storeInfoText: {
    fontSize: 30,
    marginTop: 5,
    fontWeight: "bold",
  },
  storeInfoAddress: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default StoreScreen;
