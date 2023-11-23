import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import { Button } from "@rneui/themed";

export default function SuccessScreen({navigation}) {
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#5db075",
      }}
    >
      <View
        style={{
          width,
          height: height * 0.5,
          padding: 16,
        }}
      >
        <View
          style={{
            borderColor: "#fff",
            borderWidth: 1,
            flex: 1,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 16,
              justifyContent: "top",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "black",
                fontFamily: "serif",
                marginTop: 20,
              }}
            >
              Order Success
            </Text>
            <Text
              style={{
                marginTop: 15,
                fontSize: 15,
                color: "#A9A9A9",
              }}
            >
              let's head to the store and enjoy your food!
            </Text>
            <View
              style={{
                flex: 1,
                padding: 16,
                justifyContent: "top",
                alignItems: "center",
              }}
            ></View>
            <View
              style={{
                padding: 20,
                width: 250,
                flex: 1,
                justifyContent: "top",
                alignItems: "center",
              }}
            >
              <Button
                color="#5db075"
                title="ok"
                onPress={() => navigation.navigate("HomeScreen")}
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
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});
