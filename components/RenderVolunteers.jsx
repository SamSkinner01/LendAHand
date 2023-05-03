import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    Image,
  } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db, getVolunteers, isOrganization, readFromDb, updateEvent} from "../auth/firebaseConfig";
import { deleteCollection, add_to_array } from "../auth/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import back from "../assets/back.png";
import { ScrollView } from "react-native-web";

const RenderVolunteers = ({ array }) => {
    return (
        <View>
          {array.map((item, index) => (
            <View key={index}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      );
};

export default { RenderVolunteers };