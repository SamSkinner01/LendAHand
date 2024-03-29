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
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../auth/firebaseConfig";
import { KeyboardAvoidingView } from "react-native";
import { TextInput, ScrollView } from "react-native";

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
    // handle if the user submits an empty comment
    if (textInput === "") {
      return;
    }

    setTextInput("");

    const new_data = {
      textInput,
      username: auth.currentUser.email,
      time: new Date(),
    };

    // append the new comment to existng firebase array
    try {
      await updateDoc(doc(db, "forum_posts", forum_id), {
        comments: arrayUnion(new_data),
      });
    } catch (error) {
      console.log(error);
    }

    getForumData();
  }

  useEffect(() => {
    getForumData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.middle}>
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.started_by}>
              Thread started by: {data.username}
            </Text>
            <Text style={styles.description}>{data.description}</Text>
          </View>

          {data.comments &&
            data.comments.map((comment, index) => (
              <View style={styles.comments} key={index}>
                <Text style={styles.username}>{comment.username}</Text>
                <Text style={styles.textInput}>{comment.textInput}</Text>
              </View>
            ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView style={styles.bottom} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter message"
            value={textInput}
            onChangeText={setTextInput}
            multiline={true}
            blurOnSubmit={true}
          ></TextInput>
          <Pressable style={styles.submit} onPress={handleSubmit}>
            <Text>Send</Text>
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
    paddingTop: "15%",
    paddingBottom: "5%",
    paddingLeft: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    paddingTop: 20,
  },
  started_by: {
    fontSize: 15,
    //paddingTop: 30,
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
  comments: {
    backgroundColor: "#fff",
    height: 50,
    width: 350,
    borderRadius: 10,
    paddingLeft: 30,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 20,
    width: "100%",
    borderBottomColor: "#00548e",
    borderBottomWidth: 1,
    height: "20%",
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    height: 40,
    margin: 12,
    padding: 10,
    //marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    padding: 10,
    marginBottom: 30,
    borderWidth: 1,
  },
  submit: {
    width: "20%",
    height: 40,
    margin: 12,
    marginBottom: 30,
    backgroundColor: "#00548e",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  textInput: {
    fontSize: 15,
  },
});
