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
import { ScrollView } from "react-native-web";

function MyProfile() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [profileInfo, setProfileInfo] = useState([]);
  const [profileEvents, setProfileEvetns] = useState([]);

  useEffect(() => {
    async function checkProfile() {
      const profile = await getProfile(auth.currentUser.email);
      console.log(profile);
      setProfileInfo(profile.id);
      console.log(profile[0].data.signed_up_for_events);

      const events = await getProfileEvents(profile[0].id);
      setProfileEvetns(events);
      console.log(events);
    }

    checkProfile();

    // setProfileEvents(search_by_id())
  }, []);

  return (
    <>
      <View style={styles.userInfo}>
        <RenderProfile profile={profileInfo} />
      </View>

      <View style={styles.userEvents}>
        <RenderProfileEvents
          profileEvents={profileEvents}
        ></RenderProfileEvents>
      </View>

      <View style={styles.Button}>
        <Pressable onPress={() => navigation.navigate("Profile Forum")}>
          {/* {" "}
          Forum Posts{" "} */}
          <Text>Forum Posts</Text>
        </Pressable>
      </View>

      <View style={styles.Button}>
        <Pressable onPress={() => navigation.navigate("Profile Social")}>
          {/* {" "}
          Social Media Posts */}
          <Text>Forum Posts</Text>
        </Pressable>
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

  userInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },

  Button: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "black",
    margin: 5,
  },

  userEvents: {
    display: "flex",
    flex: 1,
    margin: 10,
    flexDirection: "column",
  },
});

export { MyProfile };
