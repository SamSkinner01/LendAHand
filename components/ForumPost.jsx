import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";

const ForumPost = (props) => {
    // deletes a post from the database.
    // When a delete button is pressed, the function is called.
    async function deleteFromDB(){
        try{
            const docRef = doc(db, "forum_posts", props.id);
            await deleteDoc(docRef);
            props.getForumPosts();
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        // display for any given post.
        <View style={styles.container}>
          <Text>{props.user}</Text>
            <Text>{props.title}</Text>
          <Text>{props.description}</Text>
          <Text>{props.comments}</Text>
          <Pressable style={styles.delete} onPress={deleteFromDB}>
            <Text>Delete</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    delete:{
        backgroundColor: "red",
    }
  });

export default ForumPost;