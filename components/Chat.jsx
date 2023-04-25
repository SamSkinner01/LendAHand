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
} from "firebase/firestore";
import { db, auth } from "../auth/firebaseConfig";
import back from "../assets/back.png";
import { KeyboardAvoidingView } from "react-native";


function Chat() {
  const route = useRoute();
  const chatroom_id = route.params.chatroom_id;
  const current_user = route.params.current_user;
  const user2 = route.params.user2;
  const navigation = useNavigation();

  const [displayMessages, setDisplayMessages] = useState([]);
  const [senderOfMessage, setSenderOfMessage] = useState([]);

  const [sendUserMessage, setSendUserMessage] = useState("");
  const [userSubmit , setUserSubmit] = useState(false);


  /*
        1. Be able to create and send message to database
        2. Be able to display all messages in chatroom
        3. Update messages in real time
    */

  function sendMessage() {
    setUserSubmit(true);
    try {
      addDoc(collection(db, "messages"), {
        chatroom_id: chatroom_id,
        message: sendUserMessage,
        sender: current_user,
        timestamp: new Date(),
      });
    } catch (e) {
      console.log(e);
    }

    setSendUserMessage("");
  }

  async function displayAllMessages() {
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      where("chatroom_id", "==", chatroom_id),
      orderBy("timestamp")
    );
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

    const unsubscribe = onSnapshot(
      query(
        collection(db, "messages"),
        where("chatroom_id", "==", chatroom_id),
        orderBy("timestamp")
      ),
      (querySnapshot) => {
        let messages = [];
        let senders = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
          senders.push(doc.data().sender);
        });
        setSenderOfMessage(senders);
        setDisplayMessages(messages);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
      displayAllMessages();
  }, [userSubmit]);




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
        <Text style={styles.text_prim}>{user2}</Text>
      </View>
      <View style={styles.line}></View>
      <KeyboardAvoidingView behavior="padding" style={styles.KAVContainer}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.messages}>
              {displayMessages.map((message, index) => (
                <View style={styles.message_container} key={index}>
                  <Text style={styles.message_sender}>
                    {senderOfMessage[index]}
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
