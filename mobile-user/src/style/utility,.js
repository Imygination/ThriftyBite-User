import { StyleSheet, Platform, StatusBar } from "react-native";
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    // backgroundColor: "npLBlue",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 9,
  },
});
