import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { NavigationBar } from "../components/navigationBar";
import { signUserOut } from "../auth/auth_signout";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import {
    auth,
    getProfile,
    search_by_id,
    getProfileEvents,
} from "../auth/firebaseConfig";
import { RenderProfileEvents } from "../components/RenderProfileEvents";
import { RenderProfile } from "../components/RenderProfile";
import { ScrollView } from "react-native";
import  SocialMediaPost  from "../components/SocialMediaPost";
import { getProfileSocialPosts } from "../auth/firebaseConfig";
import { useRoute } from "@react-navigation/native";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";


function SearchProfile() {
    const navigation = useNavigation();

    const route = useRoute();
    const otherUserUsername = route.params.userInfo.username;
    const email = route.params.userInfo.email;

    const [currentUsersUsername, setCurrentUsersUsername] = useState("");


    const [profilePosts, setProfilePosts] = useState([]);

    async function createRoom() {
        /*
            This function checks to see if a chatroom contains the two users:
                - Current User
                - The user that was clicked on
            If the chatroom does not exist, it create a new chatroom with the 
            two users. If the chatroom does exist, it navigates to the Chat,
            which will search the database for the chatroom that contains 
            both users.
        */

        // Guard clause to make sure the user does not message themselves
        if(currentUsersUsername === otherUserUsername){
            return;
        }

        if(currentUsersUsername === ""){
            return;
        }

        if(otherUserUsername === ""){
            return;
        }

        try {
            // Queries to see if the chatroom exists
            const chatroomRef = collection(db, "chatrooms");
            const q = query(
                chatroomRef,
                where("users", "in", [
                    [currentUsersUsername, otherUserUsername],
                    [otherUserUsername, currentUsersUsername],
                ])
            );
            const querySnapshot = await getDocs(q);
                
            // If the size of the query is 0, that means it does not exist
            if (querySnapshot.size === 0) {
                const docRef = await addDoc(collection(db, "chatrooms"), {
                    users: [currentUsersUsername, otherUserUsername],
                    messages: []
                });
                navigation.navigate("Chat", {userInfo: { otherUsername: otherUserUsername, currentUsername: currentUsersUsername }});
            }
            // Else the chatroom exists, so navigate to the chatroom
            else{
                querySnapshot.forEach((doc) => {
                    navigation.navigate("Chat", {userInfo: { otherUsername: otherUserUsername, currentUsername: currentUsersUsername }});
            })
            }
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        async function handleGetUsername() {
            const user = await getProfile(auth.currentUser.email);
            setCurrentUsersUsername(user[0].data.username);
        }
        async function getPosts() {
            let posts = await getProfileSocialPosts(email);
            setProfilePosts(posts);
        }

        handleGetUsername();
        getPosts();
    }, []);

    return (
        <>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{otherUserUsername}'s Profile</Text>
            </View>

            {/* Message User */}
            <Pressable
                style={styles.button}
                onPress={() => {
                    createRoom()
                    //navigation.navigate("Chat", { userInfo: { otherUsername: otherUserUsername, currentUsername: currentUsersUsername  }})
                }}
            >
                <Text> Message me! </Text>
            </Pressable>

            <View style={styles.container}>


                <ScrollView>
                    {profilePosts.length === 0 && (
                        <View style={styles.no_post}>
                            <Text style={styles.no_post_text}>
                                This user has no posts yet!
                            </Text>
                        </View>
                    )}

                            

                    {profilePosts.map((post) => {
                        return (
                            <View key={post.id} style={styles.post}>
                                <SocialMediaPost
                                    title={post.data.title}
                                    description={post.data.description}
                                    image={post.data.image}
                                    user={post.data.user}
                                    comments={post.data.comments}
                                    likes={post.data.likes}
                                    id={post.id}
                                    canDelete={false}
                                />
                            </View>
                        );
                    })}
                </ScrollView>

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
    },
    header: {
        backgroundColor: "#00548e",
        padding: 10,
        alignItems: "center",
        height: 100,
        justifyContent: "center",
        paddingTop: 50,
    },
    headerText: {
        color: "black",
        fontSize: 30,
    },
    button: {
        backgroundColor: "#cbc6c3",
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    buttonText: {
        color: "black",
        fontSize: 20,
    },
    no_post: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    no_post_text: {
        fontSize: 20,
        color: "black",
    },
    post: {
        margin: 10,
    },

});

export default SearchProfile ;
