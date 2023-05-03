// update an event
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { updateEvent } from "../auth/firebaseConfig";
import {
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";

const UpdateEvent = ({ route }) => {
  const [open, setOpen] = useState(false);
  const { item } = route.params;
  const navigation = useNavigation();
  const [title, setTitle] = useState(item.data.title);
  const [event_host, setEventHost] = useState(item.data.event_host);
  const [eventLocation, setEventLocation] = useState(item.data.eventLocation);
  const [slots_remaining, setSlots] = useState();
  const [description, setDescription] = useState(item.data.description);
  const [event_type, setEventType] = useState(item.data.event_type);
  const [number_of_volunteers, setNumber_of_volunteers] = useState(
    item.data.number_of_volunteers
  );
  const [signed_up_users, setSigned_up_users] = useState(
    item.data.signed_up_users
  );
  const [date, setDate] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [fullDate, setFullDate] = useState("Select Date");
  const [startTime, setStartTime] = useState("Select Start Time");
  const [endTime, setEndTime] = useState("Select End Time");

  const [type, setTypes] = useState([
    { label: "Food", value: "Food" },
    { label: "Education", value: "Education" },
    { label: "Sanitation", value: "Sanitation" },
    { label: "Shelter", value: "Shelter" },
    { label: "Other", value: "Other" },
  ]);

  const startTimePicker = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowStartTimePicker(false);
    }
    if (Platform.OS === "ios") {
      setShowStartTimePicker(true);
    }
    const minutes =
      (selectedDate.getMinutes() < 10 ? "0" : "") + selectedDate.getMinutes();
    setStartTime(selectedDate.getHours() + ":" + minutes);

    setShowStartTimePicker(false);
  };

  const EndTimePicker = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowEndTimePicker(false);
    }
    if (Platform.OS === "ios") {
      setShowEndTimePicker(true);
    }
    const minutes =
      (selectedDate.getMinutes() < 10 ? "0" : "") + selectedDate.getMinutes();
    setEndTime(selectedDate.getHours() + ":" + minutes);

    setShowEndTimePicker(false);
  };

  const datePicker = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatepicker(false);
    }
    if (Platform.OS === "ios") {
      setShowDatepicker(true);
    }
    setFullDate(
      selectedDate.getDate() +
        "/" +
        (selectedDate.getMonth() + 1) +
        "/" +
        selectedDate.getFullYear()
    );
    setDate(selectedDate);

    setShowDatepicker(false);
  };

  async function update_event() {
    //updates the data in Firebase database:
    try {
      const newData = {
        event_host: event_host,
        title: title,
        description: description,
        start_time: startTime,
        end_time: endTime,
        event_type: event_type,
        date: date,
        full_date: fullDate,
        eventLocation: eventLocation,
        number_of_volunteers: number_of_volunteers,
        slots_remaining: number_of_volunteers,
        signed_up_users: signed_up_users,
      };
      await updateEvent(item.id, "Events", newData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    navigation.navigate("Events");
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Update Event</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          multiline={true}
          blurOnSubmit={true}
          style={styles.input_desc}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <TextInput
          style={styles.input}
          value={event_host}
          onChangeText={(text) => setEventHost(text)}
        />

        <TextInput
          style={styles.input}
          value={eventLocation}
          onChangeText={(text) => setEventLocation(text)}
        />

        <TextInput
          style={styles.input}
          value={number_of_volunteers}
          onChangeText={(text) => setNumber_of_volunteers(parseInt(text))}
        />

        {/* <TextInput
          style={styles.input}
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
            <Text>{startTime}</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => setShowEndTimePicker(true)}
          >
            <Text>{endTime}</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => setShowDatepicker(true)}
          >
            <Text>{fullDate}</Text>
          </Pressable>
        </View>

        {showStartTimePicker && (
          <DateTimePicker
            value={date}
            mode={"time"}
            is24Hour={true}
            minimumDate={new Date()}
            onChange={startTimePicker}
          />
        )}

        {showEndTimePicker && (
          <DateTimePicker
            value={date}
            mode={"time"}
            is24Hour={true}
            minimumDate={new Date()}
            onChange={EndTimePicker}
          />
        )}

        {showDatepicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            minimumDate={new Date()}
            onChange={datePicker}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={update_event}>
          <Text>Update Event</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

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
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "95%",
    backgroundColor: "#cbc6c3",
  },
});

export { UpdateEvent };
