import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import StoreImageContainer from '../components/StoreTable';
import { useDispatch } from "react-redux";

const StoreScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  



  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text onPress={() => navigation.goBack()}>Go Back</Text>
      <View style={styles.contentContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -6.942981263106864,
            longitude: 107.59278847659893,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: -6.942981263106864,
              longitude: 107.59278847659893,
            }}
            title="Andika Store"
          />
        </MapView>
        <View style={styles.storeInfoContainer}>
          <Text style={styles.storeInfoText}>Andika Store</Text>
          <Text style={styles.storeInfoAddress}>Yogyakarta dekat rumah sakit umum</Text>
        </View>
        <StoreImageContainer />
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
    marginTop: 5,
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
