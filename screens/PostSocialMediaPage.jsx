import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { db, auth } from "../auth/firebaseConfig";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

function PostSocialMediaPage() {
  const navigation = useNavigation();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  async function getAuthUser() {
    /*
    Gets the current user's email via firebase authentication. 
    Then, recieves the username from the database using the email. 
    */
    if (auth.currentUser.email) {
      setEmail(auth.currentUser.email);
    } else {
      console.log("No user is signed in");
      return;
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("email", "==", email));
    const querySnapshot = await getDocs(q);
    const temp_username = querySnapshot.docs[0].data().username;
    setUsername(temp_username);
  }

  async function postToDatabase() {
    /*
    Makes a social media post in the database.
    */
    try {
      await addDoc(collection(db, "social_media_posts"), {
        description: description,
        image: image,
        user: username,
        likes: 0,
        comments: [],
        time: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Gets the current authenticated user and email on page load.
    getAuthUser();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Make A Post</Text>
        <TextInput
          onChangeText={(text) => setDescription(text)}
          style={styles.container}
          placeholder="description"
        />
        <Pressable
          onPress={() => {
            postToDatabase();
            navigation.navigate("Social Media");
          }}
          style={styles.container}
        >
          <Text>Post</Text>
        </Pressable>
      </View>

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
