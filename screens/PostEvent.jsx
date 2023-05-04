/*

  WORK ON THIS PAGE I FOUND IT ON THE INTERNET

*/

// create a new event
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import { db, auth } from "../auth/firebaseConfig";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  where,
  query,
} from "firebase/firestore";

function PostEvent() {
  const navigation = useNavigation();
  const current_user_email = auth.currentUser.email;
  const [title, setTitle] = useState("");
  const [event_host, setEventHost] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [slots_remaining, setSlots] = useState();
  const [description, setDescription] = useState("");
  const [event_type, setEventType] = useState("");
  const [number_of_volunteers, setNumber_of_volunteers] = useState(0);
  const [signed_up_users, setSigned_up_users] = useState([]);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [fullDate, setFullDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [type, setTypes] = useState([
    { label: "Food", value: "Food" },
    { label: "Education", value: "Education" },
    { label: "Sanitation", value: "Sanitation" },
    { label: "Shelter", value: "Shelter" },
    { label: "Other", value: "Other" },
  ]);

  const startTimePicker = (event, selectedTime) => {
    if (Platform.OS === "android") {
      setShowStartTimePicker(false);
    }
    if (Platform.OS === "ios") {
      setShowStartTimePicker(true);
    }
    const minutes = selectedTime.getMinutes();
    const hours = selectedTime.getHours();
    const time = hours + ":" + minutes;
    // make a string that can pass into a date object with this time and the date
    let a = new Date(0, 0, 0, hours, minutes, 0, 0);
    setStartTime(a);
  };

  const EndTimePicker = (event, selectedTime) => {
    if (Platform.OS === "android") {
      setShowEndTimePicker(false);
    }
    if (Platform.OS === "ios") {
      setShowEndTimePicker(true);
    }

    const minutes = selectedTime.getMinutes();
    const hours = selectedTime.getHours();
    const time = hours + ":" + minutes;
    // make a string that can pass into a date object with this time and the date
    let a = new Date(0, 0, 0, hours, minutes, 0, 0);
    setEndTime(a);
  };

  const datePicker = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatepicker(false);
    }
    if (Platform.OS === "ios") {
      setShowDatepicker(true);
    }
    let a = new Date(selectedDate);
    setFullDate(a);

    //setShowDatepicker(false);
  };

  async function getUserID(userEmail) {
    const q = query(collection(db, "users"), where("email", "==", userEmail)); // find a group using a keyword
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return data[0].id;
  }

  async function create_event() {
    //Save the data to Firebase database:
    const userID = await getUserID(current_user_email);
    try {
      const event = {
        event_host: event_host,
        title: title,
        description: description,
        start_time: startTime,
        end_time: endTime,
        event_type: event_type,
        date: new Date(),
        full_date: fullDate,
        eventLocation: eventLocation,
        number_of_volunteers: number_of_volunteers,
        slots_remaining: number_of_volunteers,
        signed_up_users: signed_up_users,
        created_by: userID,
      };
      console.log("This is the event", event);
      const docRef = await addDoc(collection(db, "Events"), event);
      console.log("Event has been added with the ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    navigation.navigate("Events");
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Create an Event</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          multiline={true}
          blurOnSubmit={true}
          style={styles.input_desc}
          placeholder="Enter Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Host"
          value={event_host}
          onChangeText={(text) => setEventHost(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          value={eventLocation}
          onChangeText={(text) => setEventLocation(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter Number of Volunteers needed"
          value={number_of_volunteers}
          onChangeText={(text) => setNumber_of_volunteers(parseInt(text))}
        />

        {/* <TextInput
          style={styles.input}
          placeholder="Enter Event Type"
          value={event_type}
          onChangeText={(text) => setEventType(text)}
        /> */}

        <DropDownPicker
          open={open}
          value={event_type}
          items={type}
          setOpen={setOpen}
          setValue={setEventType}
          setItems={setTypes}
          placeholder="Select Event Type"
          placeholderStyle={styles.placeholder}
          style={styles.dropdown}
        />

        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={() => setShowStartTimePicker(true)}
          >
            <Text>Set Start Time</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => setShowEndTimePicker(true)}
          >
            <Text>Select End Time</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => setShowDatepicker(true)}
          >
            <Text>Set Date</Text>
          </Pressable>
        </View>

        {showStartTimePicker && (
          <DateTimePicker
            value={startTime}
            mode={"time"}
            is24Hour={true}
            //minimumDate={new Date()}
            onChange={startTimePicker}
          />
        )}

        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode={"time"}
            is24Hour={true}
            //minimumDate={new Date()}
            onChange={EndTimePicker}
          />
        )}

        {showDatepicker && (
          <DateTimePicker
            value={fullDate}
            mode={"date"}
            is24Hour={true}
            minimumDate={new Date()}
            onChange={datePicker}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={create_event}>
          <Text>Create Event</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#00548e",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "95%",
    backgroundColor: "#cbc6c3",
  },
  placeholder: {
    color: "grey",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#00548e",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input_desc: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export { PostEvent };
