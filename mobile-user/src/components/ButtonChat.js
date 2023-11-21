import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";

export default function ButtonChat({ StoreId }) {
  const navigation = useNavigation();
  const chatHandler = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        navigation.navigate("LoginScreen");
        throw new Error("Need Login First...");
      }
      const userId = await AsyncStorage.getItem("userId");
      navigation.navigate("MessageScreen", { StoreId, userId });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      icon="chat"
      mode="contained-tonal"
      onPress={() => chatHandler()}
      buttonColor="#C8D8D8"
    >
      Chat
    </Button>
  );
}
