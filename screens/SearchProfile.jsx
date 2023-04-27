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
    console.log(route.params.userInfo)
    const email = route.params.userInfo.email;

    const current_user = auth.currentUser.email;

    const [loggedIn, setLoggedIn] = useState(true);
    const [profileInfo, setProfileInfo] = useState([]);
    const [profileEvents, setProfileEvetns] = useState([]);
    const [profilePosts, setProfilePosts] = useState([]);

    async function createRoom() {

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.size)
        if (querySnapshot.size === 1 && email !== current_user) {

            // see if chatroom already exists
            // if it does, navigate to it
            const chatRoomRef = collection(db, "chatroom");
            const q = query(chatRoomRef, where("user1email", "==", email), where("user2email", "==", current_user));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size !== 0) {
                console.log(querySnapshot.docs[0].id)
                navigation.navigate('Chat', { chatroom_id: querySnapshot.docs[0].id, current_user: current_user, user2: email });
                return
            }

            // Create a chatroom between the two users
            try {
                addDoc(collection(db, "chatroom"), {
                    user1email: email,
                    user2email: current_user,
                });
            }
            catch (e) {
                console.log(e);
            }

            // Get the chatroom id
            const crR = collection(db, "chatroom");
            const qu = query(chatRoomRef, where("user1email", "==", email), where("user2email", "==", current_user));
            const qS = await getDocs(qu);

            let chatroom_id = "";
            qS.forEach((doc) => {
                chatroom_id = doc.id;
            });

            // Navigate to the chatroom
            navigation.navigate('Chat', { chatroom_id: chatroom_id, current_user: current_user, user2: email });
        }
        else {
            console.log("No such user!");
        }

    }

    useEffect(() => {
        async function getPosts() {
            let posts = await getProfileSocialPosts(email);
            setProfilePosts(posts);
        }

        getPosts();
    }, []);

    return (
        <>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{email}'s Profile</Text>
            </View>

            {/* Message User */}
            <Pressable
                style={styles.button}
                onPress={() => {
                    createRoom()
                    navigation.navigate("Chat", { chatroom_id: route.params.userInfo.id, current_user: current_user, user2: email })
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
