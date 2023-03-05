// create a new event
import { StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import { Pressable } from "react-native";
import {db} from "../auth/firebaseConfig";

import { collection, addDoc } from "firebase/firestore";

async function create_event() {
  try {
    const docRef = await addDoc(collection(db, "Events"), {
      title: title.value,
      description: description.value,
      start_time: start_time.value,
      end_time: end_time.value,
      event_type: event_type.value,
      event_duration: event_duration.value,
      number_of_volunteers: number_of_volunteers.value,
      signed_up_users : signed_up_users.value,
    });
    console.log("Event has been added with the ID: ", docRef.id);
    title.value = "";
    description.value = "";
    event_type.value = "";
    date.value = "";
    start_time.value = "";
    end_time.value = "";
    event_duration.value = "";
    number_of_volunteers.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}