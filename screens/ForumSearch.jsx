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
import ForumPost from "../components/ForumPost";

function ForumSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [user, setUser] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [comments, setComments] = useState([[]]);
    const [id, setID] = useState([]);

    const navigation = useNavigation();


    async function searchThroughDB(searchQuery) {
        setUser([]);
        setTitle([]);
        setDescription([]);
        setComments([]);
        setID([]);
        try{
            const forumRef = collection(db, "forum_posts");
            const q = query(forumRef, orderBy('field', '>=', searchQuery));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const data = doc.data();

                setUser(user => [...user, data.user]);
                setTitle(title => [...title, data.title]);
                setDescription(description => [...description, data.description]);
                setComments(comments => [...comments, data.comments]);
                setID(id => [...id, doc.id]);
            });

        } catch (error) {
            console.log(error);
        } 
    }
    
    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    async function showResults() {
        return (
            <>
            <FlatList 
            data = {description}
            renderItem={({item, index}) => (
                <ForumPost  
                    user={user[index]} 
                    title={title[index]}
                    description={description[index]} 
                    comments={comments[index]} 
                    id={id[index]}
                    getForumPosts={getForumPosts}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            </>
        );
    }


    return (
       <>
       <View>
            <TextInput
                placeholder="Search..."
                onChangeText={handleSearch}
                value={searchQuery}
            />
            <Pressable onPress={() => {
                searchThroughDB(searchQuery)}}>Search</Pressable>
       </View>
       </>
    )
}

export default ForumSearch;