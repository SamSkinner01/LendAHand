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
import { auth, db, findVolunteers, isOrganization, readFromDb, updateEvent} from "../auth/firebaseConfig";
import { deleteCollection, add_to_array } from "../auth/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import back from "../assets/back.png";
import { ScrollView } from "react-native-web";
import { RenderVolunteers } from "../components/RenderVolunteers";
import { useRoute } from "@react-navigation/native";

const DisplaySingularEvent = ({ item, route }) => {
    // route.params = {item: item};
    const volunteers = findVolunteers(item.id);
    <View> 
        <Text>Volunteers</Text>
        <View>
            <RenderVolunteers array={volunteers}/>
        </View> 
    </View>
}


  
export default { DisplaySingularEvent };
