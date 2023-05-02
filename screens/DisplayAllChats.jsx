import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  setDoc,
  updateDoc,
  update,
} from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, db, getProfile } from "../auth/firebaseConfig";
import { NavigationBar } from "../components/navigationBar";
import Edit from "../assets/Edit.png";
import { RefreshControl } from "react-native";
import { useCallback } from "react";

function DisplayAllChats() {

  const navigation = useNavigation();
  
  // Queries for all the chatrooms
  async function getAllChatrooms() {
    /* 
    
      GET ALL CHATROOMS WITH THIS FUNCTION
    
    */
  }



  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text style={styles.text_prim}>Your Messages</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search Page");
            }}
            color="#0F4D92"
          >
            <Image source={Edit} style={styles.icons} />
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <ScrollView>
          
        </ScrollView>
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
  sendmessage: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  chats: {
    width: "100%",
    height: 50,
    borderBottomColor: "#5A5A5A",
    borderBottomWidth: 1,
    alignItems: "center",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: "30%",
  },
  rowContainer: {
    flexDirection: "row",
    height: "10%",
    paddingTop: "11%",
    backgroundColor: "#00548e",
    marginVertical: 0,
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: "26%",
  },
  text_prim: {
    fontStyle: "bold",
    fontSize: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    maxWidth: 25,
    maxHeight: 25,
  },
});

export default DisplayAllChats;
