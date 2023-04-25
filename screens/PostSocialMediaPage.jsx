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
  where,
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
  const [displayIsImageSelected, setDisplayIsImageSelected] = useState("No image selected yet.");

  async function getAuthUser() {
    // try{
    //   console.log(auth.currentUser.email)
    //   const usersRef = collection(db, "users");
    //   console.log("DSDS")
    //   const q = query(usersRef, where("email", "==", auth.currentUser.email));
    //   console.log("DSDS")
    //   const querySnapshot = await getDocs(q);
    //   console.log("DSDS")
    //   const temp_username = querySnapshot.docs[0].data().username;
    //   console.log("DSDS")
    //   console.log("Username: ", temp_username)
    //   setUsername(temp_username);
    // }catch(error){
    //   console.log("Error getting username: ", error);
    // }
    setUsername(auth.currentUser.email)
  }

  async function postToDatabase(downloadURL) {
    /*
    Makes a social media post in the database.
    */
    try {
      console.log("Description: ", description)
      console.log("Image: ", downloadURL)
      
      await addDoc(collection(db, "social_media_posts"), {
        description: description,
        image: downloadURL,
        user: username,
        likes: 0,
        comments: [],
        time: new Date(),
      });
    } catch (error) {
      console.log("Error adding document: ", error);
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

  useEffect(() => {
    // Updates the display of whether an image is selected or not.
    if (image) {
      setDisplayIsImageSelected("Image selected");
    } else {
      setDisplayIsImageSelected("No image selected yet.");
    }
  }, [image]);


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Make A Post</Text>
        
        <View style={styles.description_containter}>
          <Text style={styles.description_title}>Give your post a description: </Text>
          <TextInput
            multiline={true}
            blurOnSubmit={true} // dismisses keyboard when done is pressed
            onChangeText={(text) => setDescription(text)}
            style={styles.description_input}
            placeholder="Enter your description here..."
          />
        </View>


        <Text style={styles.is_image_selected}>{displayIsImageSelected}</Text>
        <Pressable 
        onPress={() => {
          pickImage();
        }} 
        style={styles.upload_image}>
          <Text>Click me to select your image!</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            onClickPostPictureToDB();
          }}
          style={styles.post}
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
  },
  title:{
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 60,
    backgroundColor: "#00548e",
  },
  description_containter: {
    flex: 4,
    padding: 10,
    paddingTop: 20,
    flexDirection: "column",
  },
  description_title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description_input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
    textAlignVertical: "top",
    fontSize: 20,
    height: "80%",
  },
  upload_image:{
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    margin: 10,
    backgroundColor: "lightgrey",
  },
  post:{
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    margin: 10,
    backgroundColor: "lightgrey",

  },
  is_image_selected:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    color: "red",
  },
});

export { PostSocialMediaPage };
