/*
    -- ForumThreads.jsx --
    This component is responsible for rendering all 
    the comments on a given forum post. An ID is passed 
    to this component from ForumPost.jsx. This ID is used 
    to retrieve the comments from the database.
*/

import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";

export default function ForumThreads() {
  const route = useRoute();
  const forum_id = route.params.forum_id;

  // will hold title, description, comments, etc
  const [data, setData] = useState([]);

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

  useEffect(() => {
    getForumData();
    console.log(data);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.title}>
          <Text>{data.title}</Text>
        </View>
        <View style={styles.description}>
          <Text>{data.description}</Text>
        </View>
        <View style={styles.started_by}>
          <Text>Thread started by: {data.username}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "left",
    paddingTop: 70,
    paddingLeft: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {},
  started_by: {},
});
