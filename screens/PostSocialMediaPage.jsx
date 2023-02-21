import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
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
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function PostSocialMediaPage() {
  const navigation = useNavigation();
  const storage = getStorage();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
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
      await addDoc(collection(db, "social_media_posts"), {
        description: description,
        image: downloadURL,
        user: username,
        likes: 0,
        comments: [],
        time: new Date(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  // function that allows user to pick an image from their phone
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    console.log(result);
  }

  async function uploadImageToStorage(image) {
    if (!image) {
      console.log("No image selected");
      return;
    }
  
    const response = await fetch(image);
    const blob = await response.blob();
  
    const storageRef = ref(storage, `images/${Date.now()}`);
    const metadata = {
      contentType: "image/jpeg",
      customMetadata: {
        poster: username,
      },
    };
  
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
  }
  
  async function onClickPostPictureToDB(){
    const downloadURL = await uploadImageToStorage(image);
    postToDatabase(downloadURL);
    navigation.navigate("Social Media");
  }

  useEffect(() => {
    // Gets the current authenticated user and email on page load.
    getAuthUser();
  }, []);


  return (
    <>
      <View style={styles.container}>
        <Text>Make A Post</Text>
        <TextInput
          onChangeText={(text) => setDescription(text)}
          style={styles.container}
          placeholder="description"
        />
        <Pressable 
        onPress={() => {
          pickImage();
        } 
      }
          
        style={styles.container}>
          <Text>Upload Image</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            onClickPostPictureToDB();
          }}
          style={styles.container}
        >
          <Text>Post</Text>
        </Pressable>
      </View>

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

export { PostSocialMediaPage };
