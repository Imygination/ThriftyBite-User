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
import { fetchFoodHotDeals } from "../store/actions/actionCreators";
import { ActivityIndicator } from "react-native";

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const foods = useSelector(function (state) {
    return state.foodReducer.hotDealsFood;
  });

  useEffect(() => {
    setLoading(true)
        dispatch(fetchFoodHotDeals())
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
  }, []);
  

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
                marginTop: 15,
              }}
            >
              <TouchableHighlight
                activeOpacity={0.7}
                underlayColor="white"
                onPress={() => navigation.navigate("LoginScreen", { id: 123 })}
                style={{ flex: 1, height: 20, width: 20, marginRight: 250 }}
              >
                <Image
                  source={require("../../assets/Login.png")}
                  resizeMode="contain"
                  style={{ flex: 1 }}
                />
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.7}
                underlayColor="white"
                onPress={() => navigation.navigate("LoginScreen", { id: 123 })}
                style={{ flex: 1, height: 16, width: 16 }}
              >
                <Image
                  source={require("../../assets/Profile.png")}
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <MainCard />
            <MainCard />
            <MainCard />
            <MainCard />
            <MainCard />
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
