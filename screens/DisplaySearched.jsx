import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { search_by_keyword } from "../auth/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { RenderEvents } from "../components/RenderEvents";
import { NavigationBar } from "../components/navigationBar";
import React from "react";
import back from "../assets/back.png";

const DisplaySearched = ({ route }) => {
  const { term } = route.params;
  const [results, setResults] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    async function getSearched() {
      const result = await search_by_keyword(term);
      setResults(result);
    }
    getSearched();
  }, []);

  return (
    <>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DisplayAllEvents");
          }}
        >
          <Image source={back} style={styles.icons} />
        </TouchableOpacity>
        <Text style={styles.title}>{term}</Text>
      </View>
      <View style={styles.container}>
        <View>
          <RenderEvents allEvents={results} />
        </View>
      </View>
      <View>
        <NavigationBar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    height: "9%",
    justifyContent: "flex-start",
    paddingTop: "11%",
    backgroundColor: "#00548e",
    marginVertical: 0,
    alignItems: "center",
  },
  icons: {
    maxWidth: 30,
    maxHeight: 30,
  },
  title: {
    fontStyle: "bold",
    fontSize: 25,
    flex: 1,
    alignContent: "center",
  },
});

export { DisplaySearched };
