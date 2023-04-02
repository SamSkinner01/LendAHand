import React from "react";
import { Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const renderProfile = (profile) => {

   

    const navigation = useNavigation();
    return(
        <View style={styles.container}>
        <View>
            <View>
                <Text>{profile.name}</Text> 
                <Text>{profile.description}</Text> 
                <Text>{profile.hours}</Text>
                <Text>{profile.events}</Text>
            </View>
            <NavigationBar />
        </View>
        </View>
    )
}

export { renderProfile }
