import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, Pressable, Image, FlatList } from "react-native";
import { auth, db } from "../auth/firebaseConfig";
import { collection, getDocs, query, where, addDoc, setDoc, updateDoc, limit, orderBy, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { SearchProfile } from "./SearchProfile";
import DisplaySearchedUser from "../components/DisplaySearchedUser";
function SearchPage() {
  const navigation = useNavigation();

  const [searchContent, setSearchContent] = useState("");
  const [results, setResults] = useState([]);

  const current_user = auth.currentUser.username
  
  useEffect(() => {
    console.log("Here")
    console.log(results)
    const queryRef = collection(db, "users");
    let q = query(queryRef, orderBy("email"), limit(15));



    if (searchContent !== "") {
        q = query(queryRef, where("username", ">=", searchContent),where("username", "<=", searchContent + "\uf8ff"));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
      });
      setResults(data);
    });

    if(searchContent == ""){
        setResults([])
    }

    return unsubscribe;
  }, [searchContent]);

  const renderItem = ({ item }) => {
  return (
    <DisplaySearchedUser item={item} />
  );
};

  return (
    <View style={styles.container}>
      <View style={styles.searchField}>
        <TextInput placeholder="Enter a username" onChangeText={(e) => setSearchContent(e)} value={searchContent} />
      </View>

      {results.length === 0 ? (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>No results found</Text>
      </View>
    ) : (
      <View>
        <FlatList data={results} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
  searchField: {
    marginLeft: "10%",
    marginRight: "10%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  noResultsContainer: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
},
noResultsText: {
  fontSize: 18,
  fontWeight: "bold",
},
});

export default SearchPage;
