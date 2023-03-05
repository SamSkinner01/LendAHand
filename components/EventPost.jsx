// displays 1 post
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { doc, collection, getDocs, getDoc, query, orderBy  } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";

const EventPost = (props) => {
    // deletes a post from the database.
    // When a delete button is pressed, the function is called.
    async function deleteFromDB(){
        try{
            const docRef = doc(db, "social_media_posts", props.id);
            await deleteDoc(docRef);
            await deleteObject(storageRef)
            .then(() => {
                console.log("deleted from storage")
            }).catch((error) => {
                console.log(error)
            });
            props.getAllPosts();
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        // display for any given post.
        <View style={styles.container}>
          <Text>{props.user}</Text>
          <Image source={{url: props.image}} style={{width: 200, height: 200}}/>
          <Text>{props.description}</Text>
          <Text>{props.comments}</Text>
          <Text>{props.likes}</Text>
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

export default SocialMediaPost;

// i need to get a take the id of the event and pass it to this function

