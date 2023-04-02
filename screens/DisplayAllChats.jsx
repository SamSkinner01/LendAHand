import { View, Text, Pressable, StyleSheet, TextInput } from "react-native"
import { useState, useEffect } from "react"
import { collection, getDocs, query, where, addDoc, setDoc, updateDoc, update } from "firebase/firestore"
import { useNavigation, useRoute } from "@react-navigation/native"
import { auth, db } from "../auth/firebaseConfig"
function DisplayAllChats(){
    const navigation = useNavigation()

    // recieve the current user's email
    const current_user = auth.currentUser.email

    // To display the chatrooms and pass their IDs to the specific chat
    const [chatrooms, setChatrooms] = useState([])
    const [chatroom_ids, setChatroom_ids] = useState([])
    const [email, setEmail] = useState('');


    // Queries for all the chatrooms
    function getAllChatrooms(){
        const chatRoomRef = collection(db, "chatroom");
        getDocs(chatRoomRef).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const user1email = doc.data().user1email;
                const user2email = doc.data().user2email;

                if (user1email === current_user) {
                    setChatrooms((chatrooms) => [...chatrooms, user2email]);
                    setChatroom_ids((chatroom_ids) => [...chatroom_ids, doc.id]);
                } else if (user2email === current_user) {
                    setChatrooms((chatrooms) => [...chatrooms, user1email]);
                    setChatroom_ids((chatroom_ids) => [...chatroom_ids, doc.id]);
                }
            });
        });
    }

    useEffect(()=> {
        setChatrooms([])
        setChatroom_ids([])
        getAllChatrooms();
    }, [])

    return(

    <View style={styles.container}>
            <View>
                {
                    chatrooms.map((chatroom, index) => {
                        return(
                            <Pressable
                                key={index}
                                style={styles.chats}
                                onPress={() => navigation.navigate('Chat', {chatroom_id: chatroom_ids[index], current_user: current_user, user2: chatrooms[index]})}
                            >
                                <Text>{chatroom}</Text>
                            </Pressable>
                        )
                    }
                    )
                }
            </View>

            <Pressable
                style={styles.sendmessage}
                onPress = {() => {navigation.navigate("Search Page")}}
            >
                    <Text>Navigate to Search</Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '30%'
    },
    sendmessage : {
        color: 'white',
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    chats: {
        width: 350,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },

});

export default DisplayAllChats;