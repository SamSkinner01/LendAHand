import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import { getProfileEvents } from "../auth/firebaseConfig";
import { RenderEvents } from "../components/RenderEvents";
import ForumPost from "../components/ForumPost";
import { auth } from "../auth/firebaseConfig";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Refresh from "../assets/Refresh.png";

function ProfileEvents() {
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getPosts() {
      let e = await getProfileEvents(auth.currentUser.email);
      setEvents(e);
      console.log(events);
    }

    getPosts();
  }, [refresh]);

  return (
    <>
    <View style={styles.header}>
          <Text style={styles.header_text}>Your Events</Text>
          <TouchableOpacity onPress={() => setRefresh(!refresh)}>
            <Image source={Refresh} style={styles.icons} />
          </TouchableOpacity>
        </View>
      <View style={styles.container}>

        <ScrollView>
          <View style={styles.post}>
            <RenderEvents allEvents={events} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 40,
    backgroundColor: "#cbc6c3",
  },
  header: {
    backgroundColor: "#00548e",
    padding: 10,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    width: 25,
    height: 25,
  },
  header_text: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export { ProfileEvents };
