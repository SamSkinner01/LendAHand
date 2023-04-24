import { View, Text, StyleSheet } from "react-native";

function Comments(props){
    return(
        <View style={styles.comment}>
            <Text>{props.email}: {props.comment}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    comment: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        margin: 5,
        padding: 5,
        backgroundColor: "#cbc6c3",
    },
});

export default Comments;