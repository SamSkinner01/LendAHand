import { useEffect } from "react";
import { View, Text } from "react-native";
import { useState } from "react";
import { auth, db, getProfile } from "../auth/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import { DisplaySingularEvent } from "./DisplaySingularEvent";
import { RenderEvents } from "../components/RenderEvents";
import { StyleSheet } from "react-native";

function EventsOrgCreated() {
  const [eventsCreatedByOrginization, setEventsCreatedByOrginization] =
    useState([]);
  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    async function handleGetProfile() {
      const user = await getProfile(auth.currentUser.email);
      setProfileInfo(user[0]);
    }
    handleGetProfile();
  }, []);

  useEffect(() => {
    if (profileInfo.id) {
      setEventsCreatedByOrginization([]);
      getEventsCreatedByOrginization();
    }
  }, [profileInfo]);

  async function getEventsCreatedByOrginization() {
    const eventsRef = collection(db, "Events");
    const q = query(eventsRef, where("created_by", "==", profileInfo.id));
    const querySnapshot = getDocs(q);
    querySnapshot.then((snapshot) => {
      const events = [];
      snapshot.forEach((doc) => {
        events.push({ id: doc.id, data: doc.data() });
      });
      setEventsCreatedByOrginization(events);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Events Created</Text>
      </View>
      <View style={styles.events}>
        <RenderEvents allEvents={eventsCreatedByOrginization} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    backgroundColor: "#1E90FF",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
  },
  events: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default EventsOrgCreated;
