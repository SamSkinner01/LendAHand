import { NavigationBar } from "../components/navigationBar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db, auth } from "../auth/firebaseConfig";
import { useEffect, useState } from "react";
import { addDoc, collection, getDoc, query, orderBy } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { getProfile } from "../auth/firebaseConfig";

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
        username: username,
        email: auth.currentUser.email,
        comments: [],
        time: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleGetUsername = async () => {
      const user = await getProfile(auth.currentUser.email);
      setUsername(user[0].data.username);
    };
    handleGetUsername();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textbox}>
          <TextInput
            style={styles.titleinput}
            placeholder="Title"
            onChangeText={(text) => setTitle(text)}
            multiline={true}
            blurOnSubmit={true}
          ></TextInput>
          <TextInput
            style={styles.Descriptioninput}
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
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    justifyContent: "center",
  },
  textbox: {
    flex: 7,
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 300,
  },
  titleinput: {
    height: 50,
    width: 350,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    paddingTop: "5%",
  },
  Descriptioninput: {
    height: 300,
    width: 350,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    paddingTop: "5%",
  },

  button: {
    //flex: 1,
    alignItems: "center",
    backgroundColor: "#00548e",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    width: "60%",
    height: "10%",
  },
});

export { PostToForum };
