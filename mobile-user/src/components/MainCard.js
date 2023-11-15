import { Dimensions, Image, TouchableHighlight, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import utility from "../style/utility,";

export default function MainCard() {
  const navigation = useNavigation()
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
          onPress={() => navigation.navigate("DetailScreen", {id: 123})}
          style={{ flex: 1 }}
        >
          <Image
            source={{
              uri: "https://c.alfagift.id/product/1/1_A8021360002167_20231031133713379_base.jpg",
            }}
            style={{ flex: 1, resizeMode: "contain" }}
          />
        </TouchableHighlight>
        <View style={{ flex: 1, justifyContent:"flex-end",  backgroundColor:"transparent", margin:5  }}>
          <Text>NAMA MAKANAN</Text>
          <Text variant="titleMedium">Rp HARGA</Text>
          <Button mode="contained" buttonColor="#5db075" >
            <Text style={{ color: "white", fontSize: 10, }}>+ Keranjang</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
