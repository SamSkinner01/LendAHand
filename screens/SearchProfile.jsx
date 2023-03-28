import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { useRoute } from "@react-navigation/native";
import React, { useState } from 'react';
import { auth } from "../auth/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import Chat from '../components/Chat'
import { collection, getDocs, query, where, addDoc, setDoc, updateDoc, update } from "firebase/firestore"
import { db } from "../auth/firebaseConfig";

function SearchProfile(){
    const route = useRoute();
    const { userInfo } = route.params;

    const navigation = useNavigation();

    
    const current_user = auth.currentUser.email

    async function createRoom(){
        const email = userInfo.email;
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.size)
        if (querySnapshot.size === 1 && email !== current_user) {

            // see if chatroom already exists
            // if it does, navigate to it
            const chatRoomRef = collection(db, "chatroom");
            const q = query(chatRoomRef, where("user1email", "==", email), where("user2email", "==", current_user));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.size !== 0) {
                console.log("createRoom() called")
                return
            }

            // Create a chatroom between the two users
            try{
                addDoc(collection(db, "chatroom"), {
                    user1email: email,
                    user2email: current_user,
                    messages: [],
                });
            }
            catch(e){
                console.log(e);
            }

            // Get the chatroom id
            const crR = collection(db, "chatroom");
            const qu = query(chatRoomRef, where("user1email", "==", email), where("user2email", "==", current_user));
            const qS = await getDocs(qu);

            let chatroom_id = "";  
            qS.forEach((doc) => {
                chatroom_id = doc.id;
            });

            // Navigate to the chatroom
            navigation.navigate('Chat', {chatroom_id: chatroom_id, current_user: current_user});
        }
        else {
            console.log("No such user!");
        }

    }

    return (
       <><View style={styles.container}>
            <Text> {userInfo.username} Proflile Page</Text>
        </View>
        
        <Pressable 
            style={styles.container}
            onPress={() => {
                console.log(userInfo)
                console.log(auth.currentUser.email)
                createRoom()
                navigation.navigate("Chat", { chatroom_id: userInfo.id, current_user: current_user })
            }}
        >
            <Text> Message me! </Text>
        </Pressable>
            
            </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
    }
})


export default SearchProfile