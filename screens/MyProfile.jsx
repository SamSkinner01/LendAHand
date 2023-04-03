import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { signUserOut } from "../auth/auth_signout";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getProfile, search_by_id } from "../auth/firebaseConfig";

function MyProfile() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [profileInfo, setProfileInfo] = useState([]);
  const [profileEvents, setProfileEvetns] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  // const auth = firebase.auth();

  useEffect(() => {
    async function checkProfile() {
      const profile = await getProfile(auth.currentUser.email);
      console.log(profile)
      setProfileInfo(profile);
      console.log(profile[0].data.username)
    } 
    checkProfile()

      // setProfileEvents(search_by_id())
  }, []);

  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigation.navigate("Login");
  //     signUserOut();
  //   }

  //   setProfileInfo(getProfile())

  // }, [loggedIn]);



  

  

  

  return (
    <>
      <View>


      </View>
      
      
      
      
      <View style={styles.container}>
        <Button
          title="Sign out"
          onPress={() => {
            setLoggedIn(false);
          }}
        />
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

export { MyProfile };
