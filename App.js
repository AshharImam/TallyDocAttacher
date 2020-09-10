import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ConnectingScreen from "./app/Screens/ConnectingScreen";
import ImageCaptureScreen from "./app/Screens/ImageCaptureScreen";

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
        flex: 1,
        alignSelf: "center",
      },
      headerStyle: {
        backgroundColor: "dodgerblue",
      },
    }}
  >
    <Stack.Screen name="Connect To Server" component={ConnectingScreen} />
    <Stack.Screen name="Upload Image" component={ImageCaptureScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
