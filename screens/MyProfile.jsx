import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { signUserOut } from "../auth/auth_signout";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";

function MyProfile() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [profileInfo, setProfileInfo] = useState([]);
  const [profileEvents, setProfileEvetns] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const auth = firebase.auth();

  useEffect(() => {
    async function getProfile() {
      const profiles = await readFromDb("users");
      setEvents(allEvents);
    }

    const unsubscribe = navigation.addListener("focus", () => {
      // this was added because on naviagtion to this screen would not reload to show the updated database
      getAllEvents();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!loggedIn) {
      navigation.navigate("Login");
      signUserOut();
    }

    setProfileInfo(getProfile())

  }, [loggedIn]);



  

  

  

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
