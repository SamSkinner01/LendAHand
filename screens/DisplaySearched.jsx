import { StyleSheet, View } from 'react-native'
import { search_by_keyword } from "../auth/firebaseConfig";
import { useState, useEffect } from "react";
import { RenderEvents } from "../components/RenderEvents";
import { NavigationBar } from "../components/navigationBar";
import React from 'react'

const DisplaySearched= ({ route }) => {
  const { term } = route.params;
    const [results, setResults] = useState([]);
    useEffect(() => {
      async function getSearched() {
        const result = await search_by_keyword(term);
        setResults(result);
      }
      getSearched();
    }, []);

  return (
    <View style={{flex:1,margin:10, flexDirection:'column'}}>
    <View  style={{height:'90%'}}>
      <RenderEvents allEvents={results} />
    </View>
    <View>
      <NavigationBar />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({})

export { DisplaySearched }

