import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import { getProfileSocialPosts } from "../auth/firebaseConfig";
import { RenderEvents } from "../components/RenderEvents";
import ForumPost from "../components/ForumPost";
import SocialMediaPost from "../components/SocialMediaPost";

function ProfileSocialPosts() {
  const [profilePosts, setProfilePosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const search = await getProfileSocialPosts(auth.currentUser.email);
      setProfilePosts(search);
    }
    getPosts();
  }, []);

  return (
    <View style={{ flex: 1, margin: 10, flexDirection: "column" }}>
      <View style={{ height: "90%" }}>
        {profilePosts.map((item, index) => (
          <SocialMediaPost key={index} props={item} />
        ))}
      </View>
      <View>
        <NavigationBar />
      </View>
    </View>
  );
}

export { ProfileSocialPosts };
