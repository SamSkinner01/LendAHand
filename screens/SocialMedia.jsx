import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { useNavigation } from "@react-navigation/native";
import {db} from "../auth/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Image } from "react-native";
import SocialMediaPost from "../components/SocialMediaPost";

function SocialMedia() {
  // Every index corresponds with a post
  const [image, setImage] = useState([]);             // will contain an array of image URLs
  const [user, setUser] = useState([]);               // will contain an array of usernames
  const [description, setDescription] = useState([]); // will contain an array of descriptions
  const [comments, setComments] = useState([[]]);     // will contain an array of arrays of comments
  const [likes, setLikes] = useState([]);             // will contain an array of likes
  const [id, setId] = useState([]);                   // will contain an array of post IDs

  const navigation = useNavigation();
  
  // Queries the database for all posts and stores them in the state variables
  async function getAllPosts() {
    setImage([]);
    setUser([]);
    setDescription([]);
    setComments([]);
    setLikes([]);
    setId([]);
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
      setId(id => [...id, doc.id]);
    });
    } catch (error) {
      console.log(error);
    }
  }
  
  // Runs the getAllPosts function once when the page is loaded
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
    {
    
    <FlatList
      data={image}
      // renders every item at every index in the corresponding state arrays
      renderItem={({item, index}) => (
        <SocialMediaPost 
          image={image[index]} 
          user={user[index]} 
          description={description[index]} 
          comments={comments[index]} 
          likes={likes[index]} 
          id={id[index]}
          getAllPosts={getAllPosts}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    }
      {/* Navigate to a PostSocialMediaPage*/}
      <Pressable onPress={() => {
            navigation.navigate("PostSocialMediaPage");
      }}
        style={styles.container}>
          <Text>Post</Text>
        </Pressable>

        <Pressable onPress={() => {
            getAllPosts();
      }}
        style={styles.container}>
          <Text>Refresh</Text>
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
