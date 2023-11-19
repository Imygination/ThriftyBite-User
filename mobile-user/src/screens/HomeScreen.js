import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import { FAB, Searchbar, Text } from "react-native-paper";
import utility from "../style/utility,";
import MainCard from "../components/MainCard";
import { FloatingAction } from "react-native-floating-action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
  // const [nearbyStore, setNearbyStore] = useState(["","","","","","","","",])
  const dispatch = useDispatch();
  const foods = useSelector(function (state) {
    return state.foodReducer.hotDealsFood;
  });
  const nearbyStore = useSelector((state) => {
      return state.storeReducer.storesNearby
  })
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem("access_token").then((result) => {
      setToken(result);
    });
    const getPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission not granted");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setUserLocation(currentLocation);
        dispatch(fetchFoodHotDeals());
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
  if (!userLocation) {
    return <ActivityIndicator size="large" color="#5db075" />;
  }

  const logoutHandler = async () => {
    await AsyncStorage.clear();
  };
  const actions = [
    {
      text: "Accessibility",
      icon: require("../../assets/Login.png"),
      name: "bt_accessibility",
      position: 2,
    },
    // {
    //   text: "Language",
    //   icon: require("./images/ic_language_white.png"),
    //   name: "bt_language",
    //   position: 1
    // },
    // {
    //   text: "Location",
    //   icon: require("./images/ic_room_white.png"),
    //   name: "bt_room",
    //   position: 3
    // },
    // {
    //   text: "Video",
    //   icon: require("./images/ic_videocam_white.png"),
    //   name: "bt_videocam",
    //   position: 4
    // }
  ];

  return (
    <SafeAreaView style={utility.droidSafeArea}>
      {/* <View
        style={{ position: "absolute", zIndex: 1, height: 500, width: 300 }}
      > */}
      {/* <FloatingAction
            actions={actions}
            onPressItem={(name) => {
              console.log(`selected button: ${name}`);
            }}
          /> */}
      {/* <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => console.log("Pressed")}
        /> */}
      {/* </View> */}
      <ScrollView
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
                  style={{ flex: 1, height: 20, width: 20, marginRight: 250, marginTop:5 }}
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
                  style={{ flex: 1, height: 20, width: 20, marginRight: 250, marginTop:5 }}
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
                style={{ flex: 1, height: 50, width: 50, paddingLeft:70, paddingBottom:20 }}
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
                return (
                  <StoreCard
                  store={el}
                  key={index}
                  />
                )
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
