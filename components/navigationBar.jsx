import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {messageicon} from '../assets/messageicon.png'

function NavigationBar({}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Events"
        onPress={() => {
          navigation.navigate("Events");
        }}
      />

      <Button
        title="Social"
        onPress={() => {
          navigation.navigate("Social Media");
        }}
      />

      <Button
        title="Leaderboard"
        onPress={() => {
          navigation.navigate("Leaderboard");
        }}
      />

      <Button
        title="Profile"
        onPress={() => {
          navigation.navigate("MyProfile");
        }}
      />

    <Button
        title="Forum"
        onPress={() => {
          navigation.navigate("Forum Page");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export { NavigationBar };
