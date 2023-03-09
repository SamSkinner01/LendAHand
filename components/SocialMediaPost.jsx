import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable,TouchableOpacity,Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";
import likes from "../assets/likes.png"
import { getStorage, ref, deleteObject } from "firebase/storage";
import messageicon from '../assets/messageicon.png';

const storage = getStorage();
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9/9);
const imageWidth = dimensions.width;

const SocialMediaPost = (props) => {
    const storageRef = ref(storage, props.image);
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
          <Text style={styles.text_prim}>{props.user}</Text>
       
   
          <Image source={{url: props.image}} style={{width: imageHeight, height: imageWidth}}/>

            <View style ={styles.rowContainer}>
              <TouchableOpacity>
                <Image source ={likes} style={styles.icons}  resizeMethod="contain" />
              </TouchableOpacity> 
      
              <TouchableOpacity>
                <Image source ={messageicon} style={styles.icons}  resizeMethod="contain" />
              </TouchableOpacity> 
            </View>

          <Text style={styles.text_sec}>Liked by {props.likes} others</Text>
          <Text style={styles.text_sec}>{props.user}: {props.description}</Text>
          <Text>{props.comments}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#cbc6c3",
      alignItems: "left",
      justifyContent: "center",
      marginVertical: '0%',
    },
    text_prim:{
        fontWeight: 'bold',
        marginVertical: 3,
        marginHorizontal: "1%",
        fontSize: 20,
        fontFamily: 'Mishafi'
      },
      icons:{
        maxWidth: 30,
        maxHeight: 30,
    },
    text_sec:{
        fontSize: 15,
        marginHorizontal: "1%",
      },
      rowContainer: {
        flexDirection: 'row',
        height: 30,
        justifyContent: "space-around",
        backgroundColor:'#cbc6c3',
      },
  });

export default SocialMediaPost;