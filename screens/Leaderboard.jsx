import { StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";

function Leaderboard() {
  return (
    <>
      <View style={styles.container}>
        <Text>Leaderboard</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Leaderboard };
