import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";

function PostSocialMediaPage() {
  return (
    <>
      
      <View style={styles.container}>
        <Text>Post Social Media</Text>
    </View>
    
      {/* Navigation Bar */}
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

export { PostSocialMediaPage };
