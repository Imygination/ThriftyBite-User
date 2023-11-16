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
import { fetchFoodDetail } from "../store/actions/actionCreators";
import { useEffect } from "react";

export default function DetailScreen({route}) {
  const id = +route.params.id
  const dispatch = useDispatch()
  const detailFood = useSelector(function(state){
    return state.foodReducer.foodDetail
  })
  useEffect(()=> {
    dispatch(fetchFoodDetail(id))
  },[])
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ width: 400, height: height * 1, padding: 20 , marginTop:20}}>
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
            margin: 10,
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
                fontSize: 16, marginTop:10}}>Address : </Text>
          </View>
          <View>
            <Text style={{fontFamily: "serif",
                fontSize: 16, marginTop:10}}>Stock : {detailFood.stock}</Text>
            <Text style={{fontFamily: "serif",
                fontSize: 16, marginTop:10}}>Description : {detailFood.description}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginTop: 50,
              width: 200,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              title="Order"
              color="#5db075"
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
