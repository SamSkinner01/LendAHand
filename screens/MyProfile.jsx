import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { signUserOut } from "../auth/auth_signout";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  getProfile,
  search_by_id,
  getProfileEvents,
} from "../auth/firebaseConfig";
import { RenderProfileEvents } from "../components/RenderProfileEvents";
import { RenderProfile } from "../components/RenderProfile";

function MyProfile() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [profileInfo, setProfileInfo] = useState([]);
  const [profileEvents, setProfileEvetns] = useState([]);

  useEffect(() => {
    async function getProfileInfo() {
      const user = await getProfile(auth.currentUser.email);
      setProfileInfo(user[0].data);
    }
    getProfileInfo();
  }, []);

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.container}>
        {/* View Social Media Posts Button*/}
        <View style={styles.button}>
          <Pressable onPress={() => navigation.navigate("Profile Social")}>
            <Text style={styles.buttonText}>View your social posts</Text>
          </Pressable>
        </View>

        <View style={styles.button}>
          <Pressable onPress={() => navigation.navigate("Profile Forum")}>
            <Text style={styles.buttonText}>View your forum posts</Text>
          </Pressable>
        </View>

        <View style={styles.button}>
          <Pressable onPress={() => navigation.navigate("Profile Events")}>
            <Text style={styles.buttonText}>
              View the events you have signed up for
            </Text>
          </Pressable>
        </View>

        {profileInfo.is_organization ? (
          <View style={styles.button}>
            <Pressable onPress={() => navigation.navigate("Events Created")}>
              <Text style={styles.buttonText}>
                View the events you have created
              </Text>
            </Pressable>
          </View>
        ) : null}

        {/* Sign out button*/}
        <View>
          <Pressable
            style={styles.button}
            onPress={() => {
              signUserOut();
              setLoggedIn(false);
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        </View>
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
    backgroundColor: "#cbc6c3",
  },
  header: {
    backgroundColor: "#00548e",
    padding: 10,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    paddingTop: 50,
  },
  headerText: {
    color: "black",
    fontSize: 30,
  },
  button: {
    backgroundColor: "#00548e",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});

export { MyProfile };
