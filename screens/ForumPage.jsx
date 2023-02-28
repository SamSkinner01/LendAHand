import { NavigationBar } from "../components/navigationBar"
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db, auth } from "../auth/firebaseConfig";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ForumPage(){
    const [user, setUser] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [comments, setComments] = useState([[]]);
    
    const navigation = useNavigation();

    async function getForumPosts() {
        try {
            const forumRef = collection(db, "forum_posts");
            const q = query(postRef, orderBy("time", "desc"));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const data = doc.data();

                setUser(user => [...user, data.user]);
                setTitle(title => [...title, data.title]);
                setDescription(description => [...description, data.description]);
                setComments(comments => [...comments, data.comments]);
                setImmediate(id => [...id, doc.id]);
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
        <View style={styles.container}>
            <Text>Forum</Text>
        </View>
        {
        
        <FlatList
            renderItem={({item, index}) => (
                <ForumPost  
                    user={user[index]} 
                    description={description[index]} 
                    comments={comments[index]} 
                    id={id[index]}
                    getAllPosts={getAllPosts}
                />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
          }
          <Pressable onPress={() => {
                navigation.navigate("Forum");
          }}
            style={styles.makePost}>
              <Text>Post</Text>
            </Pressable>
        
          
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
    post: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#202020",
    },
    makePost: {
        flex: 1,
        backgroundColor: "#55009B",
        alignItems: "center",
        justifyContent: "center",
    }
  });


export {ForumPage};