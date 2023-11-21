import {
  Image,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import { Searchbar, Text } from "react-native-paper";
import utility from "../style/utility,";
import MainCard from "../components/MainCard";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  fetchFoodHotDeals,
  fetchFoodNearby,
} from "../store/actions/actionCreators";
import { ActivityIndicator } from "react-native";
import StoreCard from "../components/StoreCard";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../store";

export default function HomeScreen({ navigation }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [search, setSearch] = useState("");
  // const [nearbyStore, setNearbyStore] = useState(["","","","","","","","",])
  const dispatch = useDispatch();
  const foods = useSelector(function (state) {
    return state.foodReducer.hotDealsFood;
  });
  const nearbyStore = useSelector((state) => {
    return state.storeReducer.storesNearby;
  });

  const onChangeSearch = (query) => {
    setSearch(query);
    // console.log("Search submitted:", search);
  };

  const submitHandler = () => {
    dispatch(fetchFoodHotDeals(search));
  };

  const resetHandler = () => {
    setSearch("");
    // console.log("Search submitted:", search);
    dispatch(fetchFoodHotDeals(""));
  };

  useEffect(() => {
    setLoading(true);
    const getPermission = async () => {
      try {
        dispatch(fetchFoodHotDeals(search));
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission not granted");
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setUserLocation(currentLocation);
        dispatch(fetchFoodNearby(currentLocation));
      } catch (error) {
        console.error("Error getting location:", error);
      } finally {
        setLoading(false);
        // setNearbyStore(store.getState().foodReducer.storesNearby)
      }
    };

    getPermission();
  }, []);

  const logoutHandler = async () => {
    await AsyncStorage.clear();
    setToken("");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // This will be triggered when the screen comes into focus
      // console.log("Screen is focused");
      AsyncStorage.getItem("access_token").then((result) => {
        setToken(result);
      });
      // Your additional logic here
    });

    // Clean up the event listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    console.log("masuk");
    setRefreshing(true);
    try {
      const timeOutHome = setTimeout(() => {
        console.log("Reload Timeout...");
        setLoading(false);
        setRefreshing(false);
      }, 10000);
      let currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation(currentLocation);
      console.log(currentLocation);
      dispatch(fetchFoodHotDeals(""))
        .then(() => dispatch(fetchFoodNearby(currentLocation)))
        .then(() => {
          setRefreshing(false);
          setLoading(false);
        })
        .then(() => clearTimeout(timeOutHome))
        .catch((err) => {
          clearTimeout(timeOutHome);
          setLoading(false);
          setRefreshing(false);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SafeAreaView style={utility.droidSafeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ flex: 1, backgroundColor: "#E3EFEC", position: "relative" }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <ImageBackground
            source={require("../../assets/BG_Header_2.png")}
            resizeMode="contain"
            style={{ flex: 1, height: 201.5 }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignContent: "space-between",
                marginTop: 10,
              }}
            >
              {!token ? (
                <TouchableHighlight
                  activeOpacity={0.4}
                  underlayColor="transparant"
                  onPress={() => navigation.navigate("LoginScreen")}
                  style={{
                    flex: 1,
                    height: 20,
                    width: 20,
                    marginRight: 250,
                    marginTop: 5,
                  }}
                >
                  <Image
                    source={require("../../assets/Login.png")}
                    resizeMode="contain"
                    style={{ flex: 1 }}
                  />
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor="transparant"
                  onPress={logoutHandler}
                  style={{
                    flex: 1,
                    height: 20,
                    width: 20,
                    marginRight: 250,
                    marginTop: 5,
                  }}
                >
                  <Image
                    source={require("../../assets/Logout.png")}
                    resizeMode="contain"
                    style={{ flex: 1, marginLeft: 10 }}
                  />
                </TouchableHighlight>
              )}
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor="transparant"
                onPress={() => navigation.navigate("CartScreen")}
                style={{
                  flex: 1,
                  height: 50,
                  width: 50,
                  paddingLeft: 70,
                  paddingBottom: 20,
                }}
              >
                <Image
                  source={require("../../assets/cart.png")}
                  resizeMode="contain"
                  style={{ flex: 1 }}
                />
              </TouchableHighlight>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
        <Searchbar
          placeholder="Mau belanja apa?"
          style={{ margin: 10, marginTop: 30, backgroundColor: "#5db075" }}
          placeholderTextColor={"white"}
          inputStyle={{ color: "white" }}
          iconColor="white"
          value={search}
          onSubmitEditing={submitHandler}
          onIconPress={submitHandler}
          onChangeText={onChangeSearch}
          onClearIconPress={resetHandler}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant="titleLarge" style={{ margin: 10, fontWeight: "900" }}>
            Near Me
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            flex: 1,
            marginTop: 10,
          }}
        >
          <ScrollView horizontal>
            {nearbyStore.map((el, index) => {
              return <StoreCard store={el} key={index} />;
            })}
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text variant="titleLarge" style={{ margin: 10, fontWeight: "900" }}>
            Hot Deals
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            flex: 1,
            marginTop: 10,
            marginLeft: 20,
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#5db075" />
          ) : (
            foods.map((food) => <MainCard foods={food} key={food.id} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
