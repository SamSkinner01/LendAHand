import { View, Text, StyleSheet } from "react-native";

function Comments(props){
    return(
        <>
        <View style={styles.comment}>
            <Text style={styles.words}>{props.email}: {props.comment}</Text>
        </View>
        <View style={styles.line}></View>
        </>
    );
}

const styles = StyleSheet.create({
    comment: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        margin: 5,
        padding: 5,
        backgroundColor: "#cbc6c3"
    },
    words:{
        fontSize: "20%"
    },
    line: {
        borderBottomWidth: 1,
        borderColor: "black",
        marginVertical: 0,
      },
});

export default Comments;