import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import Delete from "../assets/Delete.png";

const ForumPost = (props) => {
  const navigation = useNavigation();

  // deletes a post from the database.
  // When a delete button is pressed, the function is called.
  async function deleteFromDB() {
    try {
      const docRef = doc(db, "forum_posts", props.id);
      await deleteDoc(docRef);
      props.getForumPosts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // display for any given post.
    <Pressable
      onPress={() =>
        navigation.navigate("ForumThreads", { forum_id: props.id })
      }
    >
      <View style={styles.container}>
        <View style={styles.postcontainer}>
          {/*<Pressable style={styles.delete} onPress={deleteFromDB}>
          <Text>x</Text>
    </Pressable> */}

          {/* <TouchableOpacity
          onPress={deleteFromDB}
          color="#0F4D92"
        >
          <Image source={Delete} style={styles.icons} />
        </TouchableOpacity> */}
          {props.canDelete && (
            <TouchableOpacity onPress={deleteFromDB} color="#0F4D92">
              <Image source={Delete} style={styles.icons} />
            </TouchableOpacity>
          )}

          <View style={styles.post}>
            <Text>{props.user}</Text>
            <Text>{props.title}</Text>
            <Text>{props.description}</Text>
            <Text>{props.comments}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },

  delete: {
    //backgroundColor: "red",
    paddingHorizontal: 5,
  },
  post: {
    padding: 5,
  },
  postcontainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    alignItems: "flex-start",
    borderWidth: 1,
    marginHorizontal: "20%",
    marginVertical: 2,
  },
  icons: {
    maxWidth: 15,
    maxHeight: 15,
    margin: 2,
  },
});

export default ForumPost;
