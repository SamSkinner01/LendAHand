import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import { getProfileSocialPosts } from "../auth/firebaseConfig";
import { RenderEvents } from "../components/RenderEvents";
import ForumPost from "../components/ForumPost";
import SocialMediaPost from "../components/SocialMediaPost";
import { auth } from "../auth/firebaseConfig";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Refresh from "../assets/Refresh.png";

function ProfileSocialPosts() {
  const [profilePosts, setProfilePosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getPosts() {
      let posts = await getProfileSocialPosts(auth.currentUser.email);
      setProfilePosts(posts);
    }

    getPosts();
  }, [refresh]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.header_text}>Your Posts</Text>
          <TouchableOpacity onPress={() => setRefresh(!refresh)}>
            <Image source={Refresh} style={styles.icons} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {profilePosts.map((post) => {
            return (
              <View key={post.id} style={styles.post}>
                <SocialMediaPost
                  title={post.data.title}
                  description={post.data.description}
                  image={post.data.image}
                  user={post.data.user}
                  comments={post.data.comments}
                  likes={post.data.likes}
                  id={post.id}
                  canDelete={true}
                />
              </View>
            );
          })}
        </ScrollView>

        <View>
          <NavigationBar />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#cbc6c3",
  },
  header: {
    flexDirection: "row",
    marginRight: 20,
  },
  icons: {
    width: 25,
    height: 25,
  },
  header_text: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#cbc6c3",
  },
});

export { ProfileSocialPosts };
