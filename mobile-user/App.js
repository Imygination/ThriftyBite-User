import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigator/MainStack";
import store from "./src/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainStack />
      </Provider>
    </NavigationContainer>
  );
}
