import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import { Button } from "@rneui/themed";

export default function DetailScreen() {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ width: 400, height: height * 0.7, padding: 20 , marginTop:20}}>
      <ScrollView>
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
              uri: "https://allwaysdelicious.com/wp-content/uploads/2015/01/char-siu-bao-vert-1.jpg",
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
              }}
            >
              Food
            </Text>
            <Text style={{fontFamily: "serif",
                fontSize: 20,}}>Nama Toko</Text>
              <Text style={{fontFamily: "serif",
                fontSize: 16,}}>Address :</Text>
          </View>
          <View>
            <Text style={{fontFamily: "serif",
                fontSize: 16,}}>Stock : </Text>
            <Text style={{fontFamily: "serif",
                fontSize: 16, marginTop:6}}>Description : </Text>
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
      </ScrollView>
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
