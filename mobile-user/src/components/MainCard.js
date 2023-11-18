import { Dimensions, Image, TouchableHighlight, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import utility from "../style/utility,";
import { useDispatch } from "react-redux";
import {
  fetchCartFood,
  addCartFood,
  minusCartFood,
} from "../store/actions/actionCreators";

export default function MainCard(props) {
  const dispatch = useDispatch();
  const food = props.foods;
  if (!food || food.length === 0) {
    return null;
  }
  const addCartHandler = () => {
    console.log("Add to Cart...");
    const cartData = {
      foodId: food.id,
      name: food.name,
      imageUrl: food.imageUrl,
      count: 1,
      price: food.price,
      itemPrice: food.price,
    };
    dispatch(addCartFood(cartData));
    // console.log(cartData);
  };
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ width: width * 0.3, height: height * 0.3 }}>
      <View
        style={[
          {
            backgroundColor: "#F0F4F3",
            flex: 1,
            borderRadius: 10,
            margin: 10,
            paddingBottom: 0,
            overflow: "hidden",
          },
          utility.shadow,
        ]}
      >
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor="white"
          onPress={() => navigation.navigate("DetailScreen", { id: food.id })}
          style={{ flex: 1 }}
        >
          <Image
            source={{
              uri: food.imageUrl,
            }}
            style={{ flex: 1, resizeMode: "contain" }}
          />
        </TouchableHighlight>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "transparent",
            margin: 5,
          }}
        >
          <Text>{food.name}</Text>
          <Text variant="titleMedium">Rp. {food.price}</Text>
          <Button
            mode="contained"
            buttonColor="#5db075"
            onPress={addCartHandler}
          >
            <Text style={{ color: "white", fontSize: 10 }}>+ Keranjang</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
