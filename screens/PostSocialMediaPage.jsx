import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import {db} from "../auth/firebaseConfig";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

function PostSocialMediaPage() {
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // posts to the database
  async function postToDatabase() {
    try{
      const docRef = await addDoc(collection(db, "social_media_posts"), {
        description: description,
        image: image,
        user: "user",
        likes: 0,
        comments: [],
        time: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      
      <View style={styles.container}>
        <Text>Make A Post</Text>
        <TextInput 
          onChangeText={(text) => setDescription(text)}
          style={styles.container} 
          placeholder="description" 
        />
        <Pressable onPress={() => {
          // post to database
          postToDatabase();
          // navigate back to social media page
          navigation.navigate("Social Media");
        }}
          style={styles.container}>
            <Text>Post</Text>
          </Pressable>

    </View>
    
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

export { PostSocialMediaPage };
