import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import { Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodDetail, addCartFood } from "../store/actions/actionCreators";
import { useEffect } from "react";
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonChat from "../components/ButtonChat";

export default function DetailScreen({route, navigation}) {
  
  const id = +route.params.id
  const dispatch = useDispatch()
  const detailFood = useSelector(function(state){
    return state.foodReducer.foodDetail
  })
  useEffect(()=> {
    dispatch(fetchFoodDetail(id))
  },[])
  if (!detailFood || detailFood.length === 0) {
    return null;
  }

  const addCartHandler = async () => {
    try {
      console.log("add cart")
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
      console.log(cartData);
      dispatch(addCartFood(cartData));
    } catch (error) {
      console.log(error);
    }
  };


  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ width: 400, height: height * 0.9, padding: 20 , marginTop:5}}>
      <Text onPress={() => navigation.goBack()}>Back To HomePage</Text>
        <View
          style={{
            borderColor: "white",
            borderWidth: 1,
            flex: 1,
            borderRadius: 18,
            overflow: "hidden",
            backgroundColor: "#FA8072",
          }}
        >
          <Image
            source={{
              uri: detailFood.imageUrl,
            }}
            style={{
              flex: 1,
              width: 370,
              height: 250,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
        <View
          style={{
            margin: 5,
          }}
        >
          <View
            style={{
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "serif",
                fontSize: 27,
                textAlign:"center"
              }}
            >
              {detailFood.name}
            </Text>
              <Text style={{fontFamily: "serif",
                fontSize: 16, marginTop:10}}>Toko : {detailFood.Store.name}</Text>
                <Text style={{fontFamily: "serif",
                fontSize: 16, marginTop:5}}>Address : {detailFood.Store.address}</Text>
          </View>
          <View>
            <Text style={{fontFamily: "serif",
                fontSize: 16, marginTop:5}}>Stock : {detailFood.stock}</Text>
            <Text style={{fontFamily: "serif",
                fontSize: 16, marginTop:5}}>{detailFood.description}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapView
          style={{ flex: 2, width: '100%', marginTop: 10 }}
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
          <View
            style={{
              marginTop: 20,
              width: 200,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            <ButtonChat StoreId={detailFood.Store.id}/>
            
            <Button
              title="Order"
              color="#5db075"
              onPress={addCartHandler}
              buttonStyle={{
                backgroundColor: "#5db075",
                borderWidth: 2,
                borderColor: "white",
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            ></Button>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
