import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { useNavigation } from "@react-navigation/native";
import {db} from "../auth/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Image } from "react-native";

function SocialMedia() {
  const [image, setImage] = useState([]);
  const [user, setUser] = useState([]);
  const [description, setDescription] = useState([]);
  const [comments, setComments] = useState([[]]);
  const [likes, setLikes] = useState([]);




  const navigation = useNavigation();
  
  // gets all the posts from the database
  // can add extra check later for friends
  async function getAllPosts() {
    try{
      const postsRef = collection(db, 'social_media_posts');
      const q = query(postsRef, orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);

     querySnapshot.forEach((doc) => {
      
      const data = doc.data();
      setImage(image => [...image, data.image]);
      setUser(user => [...user, data.user]);
      setDescription(description => [...description, data.description]);
      setComments(comments => [...comments, data.comments]);
      setLikes(likes => [...likes, data.likes]);
    });
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
    {
    
    // displays all the posts
    <FlatList
      data={image}
      renderItem={({item, index}) => (
        <View style={styles.container}>
          <Text>{user[index]}</Text>
          <Image source={{url: image[index]}} style={{width: 200, height: 200}}/>
          <Text>{description[index]}</Text>
          <Text>{comments[index]}</Text>
          <Text>{likes[index]}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    }

      



      <View style={styles.container}>
        <Text>Social Media</Text>
    </View>
      {/* Navigate to a PostSocialMediaPage*/}
      <Pressable onPress={() => {
            navigation.navigate("PostSocialMediaPage");
      }}
        style={styles.container}>
          <Text>Post</Text>
        </Pressable>
    
      {/* Navigation Bar */}
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
});

export { SocialMedia };
