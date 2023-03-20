// create a new event
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {db} from "../auth/firebaseConfig";
import { Pressable, StyleSheet, TextInput, Text, View, TouchableOpacity } from "react-native";
import  DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc } from "firebase/firestore";

function PostEvent(){
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [event_host, setEventhost] = useState('');
  const [eventLocation, setEventlocation] = useState('');
  const [slots_remaining, setSlots] = useState();
  const [description, setDescription] = useState('');
  const [event_type, setEventType] = useState('');
  const [number_of_volunteers, setNumber_of_volunteers] = useState(0);
  const [signed_up_users, setSigned_up_users] = useState([]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [fullDate, setFullDate] = useState('Select date');
  const [startTime, setStartTime] = useState('Select start time');
  const [endTime, setEndTime] = useState('Select end time');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setStartTime(currentDate.getHours() + ":" + currentDate.getMinutes());
    setEndTime(currentDate.getHours() + ":" + currentDate.getMinutes());
    setFullDate(currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear());
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  async function create_event() {
  
    //Save the data to Firebase database:
    try {
      const docRef = await addDoc(collection(db, "Events"), {
        event_host: event_host,
        title: title,
        description: description,
        start_time: startTime,
        end_time: endTime,
        event_type: event_type,
        date: fullDate,
        eventLocation: eventLocation,
        number_of_volunteers: number_of_volunteers,
        slots_remaining: number_of_volunteers,
        signed_up_users : signed_up_users,
      });
      console.log("Event has been added with the ID: ", docRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
    navigation.navigate("Events")
  }
  
  return(
  <View style={styles.container} >
    <TextInput
      placeholder="Enter Title"
      value={title}
      onChangeText={(text) => setTitle(text)}
    />
    <TextInput
      placeholder="Enter Description"
      value={description}
      onChangeText={(text) => setDescription(text)}
    />
    <TextInput
      placeholder="Enter Host"
      value={event_host}
      onChange={(text) => setEventhost(text)}
    />
    <TextInput
      placeholder="Enter Address"
      value={eventLocation}
      onChangeText={(text) => setEventlocation(text)}
    />
    <Pressable onPress={showTimepicker}>
      <Text>{startTime}</Text>
    </Pressable>
  
    <Pressable onPress={showTimepicker}>
      <Text>{endTime}</Text>
    </Pressable>

    <TextInput
      placeholder="Enter Number of Volunteers needed"
      value={number_of_volunteers}
      onChangeText={(text) => setNumber_of_volunteers(parseInt(text))}
    />
    <TextInput
      placeholder="Enter Event Type"
      value={event_type}
      onChangeText={(text) => setEventType(text)}
    />
    <Pressable onPress={showDatepicker}> 
        <Text>{fullDate}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    <TouchableOpacity onPress={create_event}>
      <Text>Create Event</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { PostEvent }
