import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";

function SocialMedia() {
  return (
    <>
      <View style={styles.container}>
        <Text>Social Media</Text>
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

export { SocialMedia };
