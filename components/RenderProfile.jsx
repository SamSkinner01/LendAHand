import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RenderProfile = (profile) => {
  //   const navigation = useNavigation();
  //   console.log(profile);
  return (
    // <View style={styles.container}>
    //   <View>
    //     <View>
    //       <Text>{profile.username}</Text>
    //       <Text>{profile.friends.length}</Text>
    //       <Text>{profile.total_hours}</Text>
    //       <Text>{profile.events_volunteered.length}</Text>
    //     </View>
    //     <NavigationBar />
    //   </View>
    // </View>
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { RenderProfile };
