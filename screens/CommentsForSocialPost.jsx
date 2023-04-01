import { Text, View, StyleSheet, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { getDocs, query, where, collection, orderBy, addDoc } from "firebase/firestore";
import { db, auth } from "../auth/firebaseConfig";
import { Button } from "react-native";
import { useEffect } from "react";
import Comments from "../components/Comments";

function CommentsForSocialPost() {
    const route = useRoute();
    const { postId } = route.params;
    const [commentsData, setCommentsData] = useState([]);
    const [currentComment, setCurrentComment] = useState("");
    const [addedPost, setAddedPost] = useState(false);

    function addComment() {
        try{
            addDoc(collection(db, "social_media_comments"), {
                postId: postId,
                email: auth.currentUser.email,
                comment: currentComment,
                timestamp: new Date(),
            });
        }
        catch(e){
            console.log(e);
            console.log("Error adding comment");
        }
    }

    async function getComments(){
        try{
            const commentsRef = collection(db, "social_media_comments");
            const q = query(commentsRef, where("postId", "==", postId), orderBy("timestamp"));
            const querySnapshot = await getDocs(q);
            let comments = [];
            querySnapshot.forEach((doc) => {
                comments.push(doc.data());
            });
            setCommentsData(comments);
        }
        catch(e){
            console.log(e);
            console.log("Error getting comments");
        }
    }

    function handleComments(text){
        setCurrentComment(text);
    }

    function handleOnPress(){
        setAddedPost(!addedPost);
        addComment();
        setCurrentComment("");
        getComments();
    }

    useEffect(() => {
            getComments();
    }, [addedPost]);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView style={styles.commentsContainer}>
                {commentsData.map((comment, index) => {
                    return (
                        <Comments
                            key = {index}
                            email={comment.email}
                            comment={comment.comment}
                        />
                    );
                })}
            </ScrollView>
            <View style={styles.submit}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a comment..."
                    value={currentComment}
                    onChangeText={(text) => handleComments(text)}
                />
                <Button title="Post" onPress={handleOnPress} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    commentsContainer:{
        flex: 20,
        width: "100%",
        paddingTop: 50,
        paddingLeft: 10,
        paddingRight: 20,
    },
    input: {
        width: "90%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginBottom: 30,
    },
    submit: {
        width: "85%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },


});

export default CommentsForSocialPost;