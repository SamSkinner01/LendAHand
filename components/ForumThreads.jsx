/*
    -- ForumThreads.jsx --
    This component is responsible for rendering all 
    the comments on a given forum post. An ID is passed 
    to this component from ForumPost.jsx. This ID is used 
    to retrieve the comments from the database.
*/

import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";

export default function ForumThreads() {
  const route = useRoute();
  const forum_id = route.params.forum_id;

  // will hold title, description, comments, etc
  const [data, setData] = useState([]);
  const [textInput, setTextInput] = useState("");

  async function getForumData() {
    // get data from database given the forum_id,
    // where forum_id is the document ID in the database
    try {
      const docRef = doc(db, "forum_posts", forum_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit() {
    // Will add a comment to the database
  }

  useEffect(() => {
    getForumData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.started_by}>
          Thread started by: {data.username}
        </Text>
      </View>

      <View style={styles.middle}>
        {
          // contains comments
        }
      </View>

      <KeyboardAvoidingView style={styles.bottom} behavior="padding">
        <View style={styles.bottom_bar}>
          <TextInput
            //multiline={true}
            style={styles.keyboard}
            placeholder="Add a comment"
            onChangeText={(text) => setTextInput(text)}
          />
          <Pressable style={styles.submit_button} onPress={handleSubmit}>
            <Text>Submit</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: "#00548e",
    justifyContent: "left",
    paddingTop: 70,
    paddingLeft: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    paddingTop: 10,
  },
  started_by: {
    fontSize: 15,
    paddingTop: 30,
  },
  middle: {
    flex: 4,
    backgroundColor: "#fff",
  },
  bottom: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  keyboard: {
    backgroundColor: "#fff",
    height: 50,
    width: 350,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00548e",
    paddingLeft: 30,
    paddingTop: 15,
  },
  submit_button: {
    flexDirection: "column",
    backgroundColor: "#00548e",
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00548e",
    alignItems: "center",
    justifyContent: "center",
  },
});
