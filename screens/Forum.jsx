import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationBar } from "../components/navigationBar";

function Forum() {
    
    return (
        <>
            <View style={styles.container}>
            <Text>Forum</Text>
            <Pressable onPress={() =>{
                EntryPage()
            }}>
                <Text>Enter a forum post</Text>
            </Pressable>  
            </View>
            <View>
            <NavigationBar />
            </View>
        </>
    );
}

function EntryPage() {
    return (
        <>
            <View style={styles.entry}>
                <TextInput style={styles.titleInput} placeholder="Title"></TextInput>
                <TextInput style={styles.descriptionInput} placeholder="Description"></TextInput>
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

export {Forum}
