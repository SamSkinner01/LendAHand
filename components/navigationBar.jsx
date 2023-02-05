import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
        title="Messages"
        onPress={() => {
          navigation.navigate("Messages");
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
