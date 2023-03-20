import React, { useState, useEffect } from "react";
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { useNavigation } from "@react-navigation/native";
import { db } from "../auth/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Image,TouchableOpacity } from "react-native";
import SocialMediaPost from "../components/SocialMediaPost";
import add from '../assets/add.png'
import Refresh from '../assets/Refresh.png'
import messageicon from '../assets/messageicon.png';



function SocialMedia() {
  const [posts, setPosts] = useState([]); // will contain an array of post objects

  const navigation = useNavigation();

  // Queries the database for all posts and stores them in the state variable
  async function getAllPosts() {
    try {
      const postsRef = collection(db, "social_media_posts");
      const q = query(postsRef, orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedPosts.push({
          id: doc.id,
          image: data.image,
          user: data.user,
          description: data.description,
          comments: data.comments,
          likes: data.likes,
        });
      });
      setPosts(fetchedPosts);
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
    <View style = {styles.rowContainer}>
      <Text style={styles.text_prim}>Lend-A-Hand</Text>

      
      <TouchableOpacity
        onPress={() => {
          getAllPosts();
        }}
        color="#0F4D92"
      >
        <Image source ={Refresh} style={styles.icons}  resizeMethod="contain" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
          navigation.navigate("PostSocialMediaPage");
        }}>
        <Image source ={messageicon} style={styles.icons2}  resizeMethod="contain" />
        </TouchableOpacity> 

        <TouchableOpacity onPress={() => {
          navigation.navigate("PostSocialMediaPage");
        }}>
        <Image source ={add} style={styles.icons}  resizeMethod="contain" />
        </TouchableOpacity> 
       

      </View>
      <View style={styles.line}></View>
      
    <View style={styles.container}>

      <ScrollView 
      showsVerticalScrollIndicator={false}
      style={{marginHorizontal:0}}
      >
        {posts.map((post, index) => (
          <SocialMediaPost
            key={index}
            image={post.image}
            user={post.user}
            description={post.description}
            comments={post.comments}
            likes={post.likes}
            id={post.id}
            getAllPosts={getAllPosts}
          />
        ))}
        </ScrollView>
      
      {/* Navigate to a PostSocialMediaPage*/}
     
      {/* Navigation Bar */}
      <View>
        <NavigationBar />
      </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    height: '9%',
    justifyContent: "space-evenly",
    paddingTop: '11%',
    backgroundColor:'#00548e',
    marginVertical: 0
  },
  icons:{
    maxWidth: 25,
    maxHeight: 25,
},
icons2:{
  maxWidth: 40,
  maxHeight: 25,  
},
text_prim:{
  fontStyle: 'bold',
  marginVertical: 1,
  fontSize: 35,
  marginRight: '20%',
  fontFamily:'Savoye LET'
},
line: {
  borderBottomWidth: 1,
  borderColor: 'black',
  marginVertical: 0,
},

});

export { SocialMedia };
