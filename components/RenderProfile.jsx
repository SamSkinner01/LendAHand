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
                <Text>{profile.username}</Text> 
                <Text>{profile.friends.length}</Text> 
                <Text>{profile.total_hours}</Text>
                <Text>{profile.events_volunteered.length}</Text>
            </View>
            <NavigationBar />
        </View>
        </View>
    )
}

export { renderProfile }
