import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MessageScreen from "../screens/MessageScreen";
import SuccessScreen from "../screens/SuccessScreen";
import CartScreen from "../screens/CartScreen";
import StoreScreen from "../screens/StoreScreen";
import MidtransScreen from "../screens/MidtransScreen"

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          statusBarColor: "black",
        }}
      />
      <Stack.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{
          headerShown: false,
          statusBarColor: "black",
        }}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          title: "Chat Penjual",
          headerTitleAlign:"center"
        }}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: "Cart",
          headerTitleAlign:"center"
        }}
      />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ headerShown:false}} />
      <Stack.Screen name="MidtransScreen" component={MidtransScreen} />
    </Stack.Navigator>
  );
}
