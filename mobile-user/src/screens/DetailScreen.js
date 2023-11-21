import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodDetail, addCartFood } from "../store/actions/actionCreators";
import { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonChat from "../components/ButtonChat";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DetailScreen({ route, navigation }) {
  const id = +route.params.id;
  const dispatch = useDispatch();
  const detailFood = useSelector(function (state) {
    return state.foodReducer.foodDetail;
  });
  useEffect(() => {
    dispatch(fetchFoodDetail(id));
  }, []);
  if (!detailFood || detailFood.length === 0) {
    return null;
  }

  const addCartHandler = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        navigation.navigate("LoginScreen");
        throw new Error("Need Login First...");
      }
      console.log("Add to Cart...");
      const cartData = {
        foodId: detailFood.id,
        name: detailFood.name,
        imageUrl: detailFood.imageUrl,
        count: 1,
        stock: detailFood.stock,
        price: detailFood.price,
        itemPrice: detailFood.price,
      };
      dispatch(addCartFood(cartData));
    } catch (error) {
      console.log(error);
    }
  };

  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ flex: 1, backgroundColor: "#A3C9AD" }}>
      <View style={{ flex: 2, backgroundColor: "white", marginBottom: 15 }}>
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
        <Image
          source={{
            uri: detailFood.imageUrl,
          }}
          style={{
            flex: 1,
            resizeMode: "contain",
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#EEF3EF",
          paddingHorizontal: 10,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            borderBottomWidth: 2,
            borderColor: "#3D8B52",
          }}
        >
          <MaterialIcons name="food-bank" size={30} color="#5B8566" />
          <Text
            variant="labelLarge"
            style={{
              fontSize: 18,
              fontWeight: "bold",
              alignSelf: "center",
              marginLeft: 10,
              color: "#5B8566",
            }}
          >
            {detailFood.Store.name}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text
            variant="titleMedium"
            style={{
              paddingTop: 5,
              color: "#325D3D"
            }}
          >
            {detailFood.name}
          </Text>
          <Text
            variant="titleLarge"
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              fontWeight: "bold",
              color: "#C84D4D",
              borderBottomWidth: 1,
              borderColor: "#3D8B52",
            }}
          >
            RP.{" "}
            {detailFood.price.toLocaleString({
              style: "currency",
              currency: "IDN",
            })}
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="food-fork-drink"
            size={30}
            color="#5B8566"
          />
          <Text
            variant="titleMedium"
            style={{
              paddingTop: 5,
              paddingLeft: 10,
              marginRight: "18%",
              color: "#5B8566",
            }}
          >
            Stock : {detailFood.stock}
          </Text>
          <ButtonChat StoreId={detailFood.Store.id} />
          <Button
            icon="cart"
            mode="contained"
            onPress={addCartHandler}
            style={{ alignSelf: "auto", marginLeft: "2%" }}
            buttonColor="#4D7D5A"
          >
            Add Cart
          </Button>
        </View>
      </View>
      <View
        style={{
          flex: 1.5,
          paddingHorizontal: 10,
          backgroundColor: "#EEF3EF",
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flex: 0.7,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 2,
            borderColor: "#3D8B52",
            flexWrap: "wrap",
            marginBottom: 10,
          }}
        >
          <MaterialIcons
            name="location-pin"
            size={25}
            color="#5B8566"
            style={{ flex: 1 }}
          />
          <Text
            variant="titleSmall"
            style={{
              flex: 10,
              paddingTop: 5,
              color: "#325D3D"
            }}
          >
            {detailFood.Store.address}
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: "orange",
            borderColor: "#325D3D",
            borderWidth: 5,
            borderRadius: 7,
            marginBottom: 5,
          }}
        >
          <MapView
            style={{ flex: 2, width: "100%" }}
            initialRegion={{
              latitude: detailFood.Store.location.coordinates[1],
              longitude: detailFood.Store.location.coordinates[0],
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: detailFood.Store.location.coordinates[1],
                longitude: detailFood.Store.location.coordinates[0],
              }}
              title={detailFood.Store.name}
            />
          </MapView>
        </View>
      </View>
      <View style={{ flex: 0.5, backgroundColor: "#EEF3EF", padding: 10 }}>
        <Text variant="titleMedium">Description</Text>
        <Text variant="bodyMedium">{detailFood.description}</Text>
      </View>
    </View>

    // <View style={{ width: 400, height: height * 0.9, padding: 20 , marginTop:5}}>
    //   <Text onPress={() => navigation.goBack()}>Back To HomePage</Text>
    //     <View
    //       style={{
    //         borderColor: "white",
    //         borderWidth: 1,
    //         flex: 1,
    //         borderRadius: 18,
    //         overflow: "hidden",
    //         backgroundColor: "#FA8072",
    //       }}
    //     >
    //       <Image
    //         source={{
    //           uri: detailFood.imageUrl,
    //         }}
    //         style={{
    //           flex: 1,
    //           width: 370,
    //           height: 250,
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       />
    //     </View>
    //     <View
    //       style={{
    //         margin: 5,
    //       }}
    //     >
    //       <View
    //         style={{
    //           marginBottom: 5,
    //         }}
    //       >
    //         <Text
    //           style={{
    //             fontFamily: "serif",
    //             fontSize: 27,
    //             textAlign:"center"
    //           }}
    //         >
    //           {detailFood.name}
    //         </Text>
    //           <Text style={{fontFamily: "serif",
    //             fontSize: 16, marginTop:10}}>Toko : {detailFood.Store.name}</Text>
    //             <Text style={{fontFamily: "serif",
    //             fontSize: 16, marginTop:5}}>Address : {detailFood.Store.address}</Text>
    //       </View>
    //       <View>
    //         <Text style={{fontFamily: "serif",
    //             fontSize: 16, marginTop:5}}>Stock : {detailFood.stock}</Text>
    //         <Text style={{fontFamily: "serif",
    //             fontSize: 16, marginTop:5}}>{detailFood.description}</Text>
    //       </View>
    //     </View>
    //     <View
    //       style={{
    //         flex: 1,
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //   <MapView
    //   style={{ flex: 2, width: '100%', marginTop: 10 }}
    //   initialRegion={{
    //     latitude: detailFood.Store.location.coordinates[1],
    //     longitude: detailFood.Store.location.coordinates[0],
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    //   }}
    // >
    //   <Marker
    //     coordinate={{
    //       latitude: detailFood.Store.location.coordinates[1],
    //       longitude: detailFood.Store.location.coordinates[0],
    //     }}
    //     title={detailFood.Store.name}
    //   />
    // </MapView>
    //   <View
    //     style={{
    //       marginTop: 20,
    //       width: 200,
    //       flex: 1,
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >

    //         <ButtonChat StoreId={detailFood.Store.id}/>

    //         <Button
    //           title="Order"
    //           color="#5db075"
    //           onPress={addCartHandler}
    //           buttonStyle={{
    //             backgroundColor: "#5db075",
    //             borderWidth: 2,
    //             borderColor: "white",
    //             borderRadius: 30,
    //           }}
    //           containerStyle={{
    //             width: 200,
    //             marginHorizontal: 50,
    //             marginVertical: 10,
    //           }}
    //         ></Button>
    //       </View>
    //     </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
