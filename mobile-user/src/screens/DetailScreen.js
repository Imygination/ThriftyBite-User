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
import ToastManager, { Toast } from 'toastify-react-native'

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
        StoreId: detailFood.StoreId
      };
      dispatch(addCartFood(cartData));
      Toast.success("Added to cart")
    } catch (error) {
      // console.log(error);
      Toast.error(error.message)
    }
  };

  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ flex: 1, backgroundColor: "#BEDBBE" }}>
      <ToastManager 
      width="90%"
      height="50"
      style={styles.toastify}
      />
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
          flex: 2,
          backgroundColor: "#FAFFFA",
          paddingHorizontal: 10,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            borderBottomWidth: 2,
            borderColor: "#3D8B52",
          }}
        >
          <MaterialIcons name="food-bank" size={55} color="#1E241E" />
          <Text
            variant="displayLarge"
            style={{
              fontSize: 25,
              fontWeight: "bold",
              alignSelf: "center",
              marginLeft: 10,
              color: "#1E241E",
            }}
          >
            {detailFood.Store.name}
          </Text>
          <View style={{alignSelf:"center", marginLeft:"5%"}}>
            <ButtonChat StoreId={detailFood.Store.id} />
          </View>
        </View>
        <View style={{ flex: 2, marginBottom:"5%" }}>
          <Text
            variant="titleMedium"
            style={{
              paddingTop: 5,
              color: "#1E241E",
              fontWeight: "bold",
            }}
          >
            {detailFood.name}
          </Text>
          <Text variant="bodyMedium" style={{opacity:0.8}}>{detailFood.description}</Text>
          <Text
            variant="titleLarge"
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              fontWeight: "bold",
              fontSize:25,
              color: "#C84D4D",
            }}
          >
            {detailFood.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
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
            size={20}
            color="#85926A"
          />
          <Text
            variant="titleMedium"
            style={{
              paddingTop: 5,
              paddingLeft: 10,
              marginRight: "18%",
              color: "#85926A",
            }}
          >
            Stock : {detailFood.stock}
          </Text>
          <Button
            icon="cart"
            mode="contained"
            onPress={addCartHandler}
            style={{ alignSelf: "auto", marginLeft: "5%", width:"50%" }}
            buttonColor="#144444"
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
            flex: 1.2,
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
              color: "#325D3D",
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
            style={{ flex: 1, width: "100%" }}
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
    </View>

    // <View style={{ flex: 1, backgroundColor: "#A3C9AD" }}>
    //   <View style={{ flex: 2, backgroundColor: "white", marginBottom: 15 }}>
    //     <Ionicons
    //       name="md-chevron-back-circle"
    //       size={40}
    //       color="black"
    //       style={{
    //         position: "absolute",
    //         zIndex: 99,
    //         opacity: 0.4,
    //         marginLeft: "5%",
    //       }}
    //       onPress={() => navigation.goBack()}
    //     />
    //     <Image
    //       source={{
    //         uri: detailFood.imageUrl,
    //       }}
    //       style={{
    //         flex: 1,
    //         resizeMode: "contain",
    //       }}
    //     />
    //   </View>
    //   <View
    //     style={{
    //       flex: 1,
    //       backgroundColor: "#EEF3EF",
    //       paddingHorizontal: 10,
    //       marginBottom: 15,
    //     }}
    //   >
    //     <View
    //       style={{
    //         flex: 1,
    //         flexDirection: "row",
    //         borderBottomWidth: 2,
    //         borderColor: "#3D8B52",
    //       }}
    //     >
    //       <MaterialIcons name="food-bank" size={30} color="#5B8566" />
    //       <Text
    //         variant="labelLarge"
    //         style={{
    //           fontSize: 18,
    //           fontWeight: "bold",
    //           alignSelf: "center",
    //           marginLeft: 10,
    //           color: "#5B8566",
    //         }}
    //       >
    //         {detailFood.Store.name}
    //       </Text>
    //     </View>
    //     <View style={{ flex: 2 }}>
    //       <Text
    //         variant="titleMedium"
    //         style={{
    //           paddingTop: 5,
    //           color: "#325D3D"
    //         }}
    //       >
    //         {detailFood.name}
    //       </Text>
    //       <Text
    //         variant="titleLarge"
    //         style={{
    //           paddingTop: 5,
    //           paddingBottom: 5,
    //           fontWeight: "bold",
    //           color: "#C84D4D",
    //           borderBottomWidth: 1,
    //           borderColor: "#3D8B52",
    //         }}
    //       >
    //         {detailFood.price.toLocaleString("id-ID",{
    //           style: "currency",
    //           currency: "IDR",
    //         })}
    //       </Text>
    //     </View>
    //     <View
    //       style={{
    //         flex: 2,
    //         flexDirection: "row",
    //         alignItems: "center",
    //       }}
    //     >
    //       <MaterialCommunityIcons
    //         name="food-fork-drink"
    //         size={30}
    //         color="#5B8566"
    //       />
    //       <Text
    //         variant="titleMedium"
    //         style={{
    //           paddingTop: 5,
    //           paddingLeft: 10,
    //           marginRight: "18%",
    //           color: "#5B8566",
    //         }}
    //       >
    //         Stock : {detailFood.stock}
    //       </Text>
    //       <ButtonChat StoreId={detailFood.Store.id} />
    //       <Button
    //         icon="cart"
    //         mode="contained"
    //         onPress={addCartHandler}
    //         style={{ alignSelf: "auto", marginLeft: "2%" }}
    //         buttonColor="#4D7D5A"
    //       >
    //         Add Cart
    //       </Button>
    //     </View>
    //   </View>
    //   <View
    //     style={{
    //       flex: 1.5,
    //       paddingHorizontal: 10,
    //       backgroundColor: "#EEF3EF",
    //       marginBottom: 15,
    //     }}
    //   >
    //     <View
    //       style={{
    //         flex: 0.7,
    //         flexDirection: "row",
    //         alignItems: "center",
    //         borderBottomWidth: 2,
    //         borderColor: "#3D8B52",
    //         flexWrap: "wrap",
    //         marginBottom: 10,
    //       }}
    //     >
    //       <MaterialIcons
    //         name="location-pin"
    //         size={25}
    //         color="#5B8566"
    //         style={{ flex: 1 }}
    //       />
    //       <Text
    //         variant="titleSmall"
    //         style={{
    //           flex: 10,
    //           paddingTop: 5,
    //           color: "#325D3D"
    //         }}
    //       >
    //         {detailFood.Store.address}
    //       </Text>
    //     </View>
    //     <View
    //       style={{
    //         flex: 3,
    //         backgroundColor: "orange",
    //         borderColor: "#325D3D",
    //         borderWidth: 5,
    //         borderRadius: 7,
    //         marginBottom: 5,
    //       }}
    //     >
    //       <MapView
    //         style={{ flex: 2, width: "100%" }}
    //         initialRegion={{
    //           latitude: detailFood.Store.location.coordinates[1],
    //           longitude: detailFood.Store.location.coordinates[0],
    //           latitudeDelta: 0.01,
    //           longitudeDelta: 0.01,
    //         }}
    //       >
    //         <Marker
    //           coordinate={{
    //             latitude: detailFood.Store.location.coordinates[1],
    //             longitude: detailFood.Store.location.coordinates[0],
    //           }}
    //           title={detailFood.Store.name}
    //         />
    //       </MapView>
    //     </View>
    //   </View>
    //   <View style={{ flex: 0.5, backgroundColor: "#EEF3EF", padding: 10 }}>
    //     <Text variant="titleMedium">Description</Text>
    //     <Text variant="bodyMedium">{detailFood.description}</Text>
    //   </View>
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
