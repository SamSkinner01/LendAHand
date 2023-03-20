import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { DisplayAllEvents } from "./screens/DisplayAllEvents";
import { Leaderboard } from "./screens/Leaderboard";
import { Messages } from "./screens/Messages";
import { MyProfile } from "./screens/MyProfile";
import { SocialMedia } from "./screens/SocialMedia";
import { ForumPage } from "./screens/ForumPage";
import { PostToForum } from "./screens/PostToForum";
import { ForumSearch } from "./screens/ForumSearch";
import { PostSocialMediaPage } from "./screens/PostSocialMediaPage";
import { PostEvent } from "./screens/PostEvent";
import { DisplaySingularEvent } from "./screens/DisplaySingularEvent";
import { UpdateEvent } from "./screens/UpdateEvent";
import { DisplaySearched } from "./screens/DisplaySearched";
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
        <Stack.Screen name="Post Event" component={PostEvent} />
        <Stack.Screen name="Events" component={DisplayAllEvents} />
        <Stack.Screen name="Event Page" component={DisplaySingularEvent} />
        <Stack.Screen name="Update Event" component={UpdateEvent} />
        <Stack.Screen name="Search Results" component={DisplaySearched} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Social Media" component={SocialMedia} />
        <Stack.Screen name="Forum Page" component={ForumPage} />
        <Stack.Screen name="Post To Forum" component={PostToForum} />
        <Stack.Screen name="Search Forum" component={ForumSearch} />
        <Stack.Screen 
          options={{ headerShown: true }}
          name="PostSocialMediaPage" 
          component={PostSocialMediaPage} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
