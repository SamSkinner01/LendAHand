import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { messageicon } from "../assets/messageicon.png";

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

      {/* <Button
        title="Leaderboard"
        onPress={() => {
          navigation.navigate("Leaderboard");
        }}
      /> */}

      <Button
        title="Forum"
        onPress={() => {
          navigation.navigate("Forum Page");
        }}
      />

      <Button
        title="Profile"
        onPress={() => {
          navigation.navigate("MyProfile");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#cbc6c3",
    padding: 5,
    paddingBottom: 10,
    width: "100%",
  },
});

export { NavigationBar };
