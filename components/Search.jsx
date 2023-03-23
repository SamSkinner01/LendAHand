import {View, Text, StyleSheet} from "react-native";

function Search() {
    return (
        <View styles={styles.container}>
            <Text>Search Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#cbc6c3",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default Search