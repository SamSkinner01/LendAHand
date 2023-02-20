import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { useNavigation } from "@react-navigation/native";
import {db} from "../auth/firebaseConfig";
import { useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function SocialMedia() {
  const navigation = useNavigation();
  
  // gets all the posts from the database
  // can add extra check later for friends
  async function getAllPosts() {
    try{
      const postsRef = collection(db, 'social_media_posts');
      const q = query(postsRef, orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);

     querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`); 
      });
    } catch (error) {
      console.log(error);

    }
  }
  
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      
      <View style={styles.container}>
        <Text>Social Media</Text>
    </View>
      {/* Navigate to a PostSocialMediaPage*/}
      <Pressable onPress={() => {
            navigation.navigate("PostSocialMediaPage");
      }}
        style={styles.container}>
          <Text>Post</Text>
        </Pressable>
    
      {/* Navigation Bar */}
      <View>
        <NavigationBar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { SocialMedia };
