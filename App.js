import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { Events } from "./screens/Events";
import { Leaderboard } from "./screens/Leaderboard";
import { Messages } from "./screens/Messages";
import { MyProfile } from "./screens/MyProfile";
import { SocialMedia } from "./screens/SocialMedia";
import { ForumPage } from "./screens/ForumPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Social Media" component={SocialMedia} />
        <Stack.Screen name="Forum" component={ForumPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
