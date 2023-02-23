import { NavigationBar } from "../components/navigationBar"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
;

function Forum() {
    const navigation = useNavigation();
    const storage = getStorage();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    async function getAuthUser() {
    /*
    Gets the current user's email via firebase authentication. 
    Then, recieves the username from the database using the email. 
    */
    if (auth.currentUser.email) {
        setEmail(auth.currentUser.email);
    } else {
        console.log("No user is signed in");
        return;
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("email", "==", email));
    const querySnapshot = await getDocs(q);
    const temp_username = querySnapshot.docs[0].data().username;
    setUsername(temp_username);
    }

    async function postToDatabase(downloadURL) {
    /*
    Makes a social media post in the database.
    */
    try {
        await addDoc(collection(db, "forum_posts"), {
        title: title,
        description: description,
        user: username,
        comments: [],
        time: new Date(),
        });
    } catch (error) {
        console.log(error);
    }
    }


    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    return new Promise((resolve, reject) => {
        uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            reject(error);
        },
        async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
        }
        );
    });

    useEffect(() => {
    // Gets the current authenticated user and email on page load.
    getAuthUser();
    }, []);
  
  
    return (
        <>
            <View>
                <TextInput style={styles.container} placeholder="Title"></TextInput>
                <TextInput style={styles.container} placeholder="Description"></TextInput>
                <Pressable onPress={() =>{
                    EntryPage()
                }}>
                    <Text>Post to Forum</Text>
                </Pressable>  
            </View>
            <View>
                <NavigationBar/>
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

export {Forum}
