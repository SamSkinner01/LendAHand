import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { useNavigation } from "@react-navigation/native";


function SocialMedia() {
  const navigation = useNavigation();
  return (
    <>
      
      {/* Navigate to a PostSocialMediaPage*/}
      <Pressable onPress={() => {
            navigation.navigate("PostSocialMediaPage");
      }}
        style={styles.container}>
          <Text>Post</Text>
        </Pressable>
    
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

export { SocialMedia };
