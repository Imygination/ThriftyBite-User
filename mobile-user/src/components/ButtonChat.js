import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";

export default function ButtonChat() {
  const navigation = useNavigation();
  const { StoreId } = useRoute().params;
  const chatHandler = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log({StoreId, userId});
  };
  return (
    <Button
      icon="message"
      mode="contained-tonal"
      onPress={chatHandler}
      buttonColor="#E3EFEC"
    >
      Chat Penjual
    </Button>
  );
}
