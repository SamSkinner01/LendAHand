// ignore all warnings
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { DisplayAllEvents } from "./screens/DisplayAllEvents";
import { Leaderboard } from "./screens/Leaderboard";
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
import DisplayAllChats from "./screens/DisplayAllChats";
import Chat from "./components/Chat";
import SearchPage from "./screens/SearchPage";
import SearchProfile from "./screens/SearchProfile";
import CommentsForSocialPost from "./screens/CommentsForSocialPost";
import ForumThreads from "./components/ForumThreads";import { ProfileForumPosts } from "./screens/ProfileForumPosts";
import { ProfileSocialPosts } from "./screens/ProfileSocialPosts";
import { ProfileEvents } from "./screens/ProfileEvents";
import ListVolunteers from "./screens/ListVolunteers";
import EventsOrgCreated from "./screens/ProfileEventsOrgCreated";



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
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Social Media" component={SocialMedia} />
        <Stack.Screen name="Forum Page" component={ForumPage} />
        <Stack.Screen name="Post To Forum" component={PostToForum} />
        <Stack.Screen name="Search Forum" component={ForumSearch} />
        <Stack.Screen name="DisplayAllChats" component={DisplayAllChats} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Search Page" component={SearchPage} /> 
        <Stack.Screen name = "Search Profile" component = {SearchProfile} />
        <Stack.Screen name = "CommentsForSocialPost" component = {CommentsForSocialPost} />
        <Stack.Screen name = "Profile Forum" component = {ProfileForumPosts} />
        <Stack.Screen name = "Profile Social" component = {ProfileSocialPosts} />
        <Stack.Screen name = "ForumThreads" component = {ForumThreads} />
        <Stack.Screen name="PostSocialMediaPage" component={PostSocialMediaPage} />
        <Stack.Screen name="DisplayAllEvents" component={DisplayAllEvents}/>
        <Stack.Screen name="Profile Events" component={ProfileEvents}/>
        <Stack.Screen name="List Volunteers" component={ListVolunteers}/>
        <Stack.Screen name="Events Created" component={EventsOrgCreated}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
