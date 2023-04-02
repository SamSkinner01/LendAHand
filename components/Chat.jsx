import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView,TouchableOpacity,Image} from "react-native";
import { collection, addDoc, getDocs, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../auth/firebaseConfig";
import back from '../assets/back.png';


function Chat(){
    const route = useRoute();
    const chatroom_id = route.params.chatroom_id;
    const current_user = route.params.current_user;
    const navigation = useNavigation();

    const [displayMessages, setDisplayMessages] = useState([]);
    const [senderOfMessage, setSenderOfMessage] = useState([]);

    const [sendUserMessage, setSendUserMessage] = useState("");


    /*
        1. Be able to create and send message to database
        2. Be able to display all messages in chatroom
        3. Update messages in real time
    */

    function sendMessage(){
        try{
            addDoc(collection(db, "messages"), {
                chatroom_id: chatroom_id,
                message: sendUserMessage,
                sender: current_user,
                timestamp: new Date(),
            });
        }   
        catch(e){
            console.log(e);
        }

        setSendUserMessage("");
    }

    async function displayAllMessages(){
        const messagesRef = collection(db, "messages");
        const q = query(messagesRef, where("chatroom_id", "==", chatroom_id), orderBy("timestamp"));
        const querySnapshot = await getDocs(q);

        let messages = [];
        let senders = [];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());
            senders.push(doc.data().sender);
        });
        setSenderOfMessage(senders);
        setDisplayMessages(messages);
    }

    useEffect(() => {
        displayAllMessages();

        const unsubscribe = onSnapshot(query(collection(db, "messages"), where("chatroom_id", "==", chatroom_id), orderBy("timestamp")), (querySnapshot) => {
            let messages = [];
            let senders = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
                senders.push(doc.data().sender);
            });
            setSenderOfMessage(senders);
            setDisplayMessages(messages);
        });

        return () => unsubscribe();
    }, []);


    return(
        <>
         <View style={styles.rowContainer}>
            
            <TouchableOpacity
             onPress={() => {
                navigation.navigate("DisplayAllChats");
             }}
        color="#0F4D92"
      >
        <Image source ={back} style={styles.icons}  />
      </TouchableOpacity>
      <Text style={styles.text_prim}>{senderOfMessage[1]}</Text>

         </View>
         <View style={styles.line}></View>
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.messages}>
                {displayMessages.map((message, index) => (
                    <View style={styles.message_container}  key={index}>
                        <Text style={styles.message_content}>{message.message}</Text>
                        <Text style={styles.message_sender}>{senderOfMessage[index]}</Text>
                    </View>
                ))}
            </View>
            </ScrollView>


            <View style={styles.input}>
                <TextInput 
                    placeholder="Enter message"
                    value={sendUserMessage}
                    onChangeText={setSendUserMessage}
                ></TextInput>
                <Pressable 
                    style={styles.submit}
                    onPress={sendMessage}
                >
                    <Text>Send</Text>
                </Pressable>
            </View>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#cbc6c3",
    },
    input: {
    
        bottom: 0,
        width: '100%',
        paddingLeft: 20,
        backgroundColor: 'white',
        height: 55,
        justifyContent: 'left',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        border: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    submit: {
        // aline right
        position: 'absolute',
        paddingRight: 20,
        right: 0,
        width: 60,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        border: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    message_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: 5,
        padding: 5,
      },
      
      message_content: {
        width: '100%',
        height: 50,
        margin: 5,
        padding: 5,
        textAlign: 'left',
        fontSize: 18,
      },
      
      
      message_sender: {
        width: '100%',
        height: 20,
        marginVertical: 2,
        paddingHorizontal: 5,
        textAlign: 'left',
        color: 'gray',
      },
      rowContainer: {
        flexDirection: "row",
        height: '9%',
        justifyContent: "space-evenly",
        paddingTop: '11%',
        backgroundColor:'#00548e',
        marginVertical: 0,
        alignItems: 'center',
      },
      line: {
        borderBottomWidth: 1,
        borderColor: 'black',
        marginVertical: 0,
      },
      text_prim:{
        fontStyle: 'bold',
        fontSize: 25,
        flex: 1,
        marginHorizontal: '2%'
      },
      icons:{
        maxWidth: 25,
        maxHeight: 25,
    },

});

export default Chat;