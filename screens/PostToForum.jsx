import { NavigationBar } from "../components/navigationBar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db, auth } from "../auth/firebaseConfig";
import { useEffect, useState } from "react";
import { addDoc, collection, getDoc, query, orderBy } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function PostToForum() {
  const navigation = useNavigation();
  const storage = getStorage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  // async function getAuthUser() {
  //     /*
  //     Gets the current user's email via firebase authentication.
  //     Then, recieves the username from the database using the email.
  //     */
  //     if (auth.currentUser.email) {
  //         setEmail(auth.currentUser.email);
  //     } else {
  //         console.log("No user is signed in");
  //         return;
  //     }

  //     const usersRef = collection(db, "users");
  //     const q = query(usersRef, orderBy("email", "==", email));
  //     const querySnapshot = await getDoc(q);
  //     const temp_username = querySnapshot.docs.data().username;
  //     setUsername(temp_username);
  // }

  async function postToDatabase() {
    /*
        Makes a social media post in the database.
        */
    try {
      await addDoc(collection(db, "forum_posts"), {
        title: title,
        description: description,
        username: auth.currentUser.email,
        comments: [],
        time: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Gets the current authenticated user and email on page load.
    //getAuthUser();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textbox}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={(text) => setTitle(text)}
            multiline={true}
            blurOnSubmit={true}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            blurOnSubmit={true}
          ></TextInput>
        </View>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              postToDatabase();
              navigation.navigate("Forum Page");
              //EntryPage()
            }}
          >
            <Text>Post to Forum</Text>
          </Pressable>
        </View>
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
  textbox: {
    flex: 7,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 300,
  },
  input: {
    height: 100,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
});

export { PostToForum };
