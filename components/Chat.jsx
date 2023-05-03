import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  updateDoc,
  arrayUnion,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../auth/firebaseConfig";
import back from "../assets/back.png";
import { KeyboardAvoidingView } from "react-native";




function Chat() {

  const navigation = useNavigation();
  const route = useRoute();
  const otherUser = route.params.userInfo.otherUsername;
  const currentUser = route.params.userInfo.currentUsername;
  const [ chatroomID , setChatroomID ] = useState("");
  const [ sendUserMessage, setSendUserMessage ] = useState("");
  const [ userSubmit , setUserSubmit ] = useState(false);

  const [ messages, setMessages ] = useState([]);


  async function sendMessage() {
    /*
      This function will send a message to the chatroom given some chatroomID
      that was found earlier. The message will be sent from the current user.
      The message will be sent to the other user. 
    */

    setSendUserMessage("");

    // Guard clause for sending an empty message
    if (sendUserMessage === "") {
      return;
    }

    // Create a message object
    const message = {
      message: sendUserMessage,
      sender: currentUser,
    };

    try {
      // Get the current messages array
      const chatroomRef = doc(db, "chatrooms", chatroomID);
      const chatroomDoc = await getDoc(chatroomRef);
      const currentMessages = chatroomDoc.data().messages;

      // Append the new message to the messages array
      const updatedMessages = [...currentMessages, message];

      // Update the doc with the updated messages array
      await updateDoc(chatroomRef, { messages: updatedMessages });
    } catch (e) {
      console.log(e);
    }

    setUserSubmit(!userSubmit);
  }



  async function displayAllMessages() {
    try {
      // Get the chatroom that contains the two users
      // Should be the ID but was not working initially.
      const chatroomRef = collection(db, "chatrooms")
      const q = query(chatroomRef, where("users", "in", [
        [currentUser, otherUser],
        [otherUser, currentUser]
      ]));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setMessages(doc.data().messages);
      })
    }
    catch (e) {
      console.log(e);
    }

  }

  async function getChatroomID(){
    try{
      const chatroomRef = collection(db, "chatrooms");
      const q = query(chatroomRef, where("users", "in", [
        [currentUser, otherUser],
        [otherUser, currentUser]
      ]))

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setChatroomID(doc.id);
      }
      )

      console.log(chatroomID)
    
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getChatroomID();
    displayAllMessages();
  }, [])

  useEffect(() => {
    displayAllMessages();
  }, [userSubmit])

  useEffect(()=>{
    const q = query(collection(db, "chatrooms"), where("users", "in", [
      [currentUser, otherUser],
      [otherUser, currentUser]
    ]));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setMessages(doc.data().messages);
      })
    });
  }, [])

  return (
    <>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DisplayAllChats");
          }}
          color="#0F4D92"
        >
          <Image source={back} style={styles.icons} />
        </TouchableOpacity>
        <Text style={styles.text_prim}>{otherUser}</Text>
      </View>
      <View style={styles.line}></View>
      <KeyboardAvoidingView behavior="padding" style={styles.KAVContainer}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.messages}>
              {messages.map((message, index) => (
                <View style={styles.message_container} key={index}>
                  <Text style={styles.message_sender}>
                    {message.sender}
                  </Text>
                  <Text style={styles.message_content}>{message.message}</Text>
                </View>
              ))}

            </View>
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter message"
              value={sendUserMessage}
              onChangeText={setSendUserMessage}
            ></TextInput>
            <Pressable style={styles.submit} onPress={sendMessage}>
              <Text>Send</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
  },
  KAVContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    width: "90%",
    height: 40,
    margin: 12,
    padding: 10,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    padding: 10,
    marginBottom: 30,
    borderWidth: 1,
  },
  submit: {
    width: "20%",
    height: 40,
    margin: 12,
    marginBottom: 30,
    backgroundColor: "#00548e",
    alignItems: "center",
    justifyContent: "center",
  },
  message_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: 5,
    padding: 5,
  },

  message_content: {
    width: "100%",
    height: 30,
    margin: 5,
    padding: 5,
    textAlign: "left",
    fontSize: 18,
    color: "black",
  },

  message_sender: {
    width: "100%",
    height: 20,
    marginVertical: 1,
    paddingHorizontal: 5,
    textAlign: "left",
    color: "black",
  },
  rowContainer: {
    flexDirection: "row",
    height: "9%",
    justifyContent: "space-evenly",
    paddingTop: "11%",
    backgroundColor: "#00548e",
    marginVertical: 0,
    alignItems: "center",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "black",
    marginVertical: 0,
  },
  text_prim: {
    fontStyle: "bold",
    fontSize: 25,
    flex: 1,
    marginHorizontal: "2%",
  },
  icons: {
    maxWidth: 25,
    maxHeight: 25,
  },
});

export default Chat;
