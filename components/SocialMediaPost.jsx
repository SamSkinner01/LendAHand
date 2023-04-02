import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";
import { getStorage, ref, deleteObject } from "firebase/storage";
import messageicon from '../assets/messageicon.png';
import { useNavigation } from "@react-navigation/native";
import { updateDoc } from "firebase/firestore";
import likes from "../assets/likes.png";
import like_clicked from "../assets/like_clicked.png";

const SocialMediaPost = (props) => {

  const storage = getStorage();
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(dimensions.width * 9 / 9);
  const imageWidth = dimensions.width;

  const [liked, setLiked] = useState(false);
  const [image, setImage] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState(props.likes);

  const navigation = useNavigation();
  const storageRef = ref(storage, props.image);


  async function deleteFromDB() {
    /*
      Deletes a post from both the database and storage.
    */
    try {
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
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    /*
      Updates the number of likes in the database when the number of likes is changed.
    */
    const updateLikes = async () => {
      try {
        const docRef = doc(db, "social_media_posts", props.id);
        await updateDoc(docRef, {
          likes: numberOfLikes,
        });
      } catch (error) {
        console.log(error);
      }
    }
    updateLikes();
  }, [numberOfLikes])


  const handleLike = () => {
    /*
      Handles when the like button is pressed.
    */

    // If the post is already liked, unlike it
    if (liked) {
      setLiked(false);
      setNumberOfLikes(numberOfLikes - 1);
    }
    // If the post is not liked, like it
    else {
      setLiked(true);
      setNumberOfLikes(numberOfLikes + 1);
    }

  }

  useEffect(() => {
    /*
      Sets the like button to the correct image when the liked variable is changed
    */
    if (liked) {
      setImage(like_clicked);
    }
    else {
      setImage(likes);
    }
  }, [liked])

  return (
    <View style={styles.container}>
      <Text style={styles.text_prim}>{props.user}</Text>
      <Image source={{ url: props.image }} style={{ width: imageHeight, height: imageWidth }} />
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={handleLike}>
          <Image source={image} style={styles.icons} resizeMethod="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('CommentsForSocialPost', { postId: props.id }) }}>
          <Image
            source={messageicon}
            style={styles.icons}
            resizeMethod="contain"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.text_sec}>Liked by {numberOfLikes} others</Text>
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
  text_prim: {
    fontWeight: 'bold',
    marginVertical: 3,
    marginHorizontal: "1%",
    fontSize: 20,
  },
  icons: {
    maxWidth: 30,
    maxHeight: 30,
  },
  text_sec: {
    fontSize: 15,
    marginHorizontal: "1%",
  },
  rowContainer: {
    flexDirection: 'row',
    height: 30,
    justifyContent: "space-around",
    backgroundColor: '#cbc6c3',
  },
});

export default SocialMediaPost;