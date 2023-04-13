import { NavigationBar } from "../components/navigationBar";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { auth, db } from "../auth/firebaseConfig";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import ForumPost from "../components/ForumPost";

function ForumPage() {
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [comments, setComments] = useState([[]]);
  const [id, setID] = useState([]);

  const navigation = useNavigation();

  async function getForumPosts() {
    setUser([]);
    setTitle([]);
    setDescription([]);
    setComments([]);
    setID([]);
    try {
      const forumRef = collection(db, "forum_posts");
      const q = query(forumRef, orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        setUser((user) => [...user, data.username]);
        setTitle((title) => [...title, data.title]);
        setDescription((description) => [...description, data.description]);
        //setComments((comments) => [...comments, data.comments]);
        setID((id) => [...id, doc.id]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // this was added because on naviagtion to this screen would not reload to show the updated database
      getForumPosts();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View style={styles.rowContainer}>
        <Text style={styles.text_prim}>Lend-A-Hand</Text>
        <TouchableOpacity
          onPress={() => {
            getForumPosts();
          }}
          color="#0F4D92"
          style={styles.refresh}
        >
          <Button title="Refresh" color="#0F4D92" onPress={getForumPosts} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Post To Forum");
          }}
          style={styles.post}
        >
          <Button
            title="Post"
            color="#0F4D92"
            onPress={() => {
              navigation.navigate("Post To Forum");
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 0 }}
        >
          {user.map((user, index) => (
            <ForumPost
              key={index}
              user={user}
              title={title[index]}
              description={description[index]}
              comments={comments[index]}
              id={id[index]}
            />
          ))}
        </ScrollView>

        {/* Navigate to a PostSocialMediaPage*/}

        {/* Navigation Bar */}
        <View>
          <NavigationBar />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    height: "9%",
    justifyContent: "space-evenly",
    paddingTop: "11%",
    backgroundColor: "#00548e",
    marginVertical: 0,
  },
  text_prim: {
    fontStyle: "bold",
    marginVertical: 1,
    fontSize: 35,
    marginRight: "20%",
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "black",
    marginVertical: 0,
  },
  refresh: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#202020",
    marginVertical: 0,
    marginHorizontal: 0,
    width: "20%",
    height: "100%",
    borderRadius: 10,
  },
  post: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#202020",
    marginVertical: 0,
    marginHorizontal: 0,
    width: "20%",
    height: "100%",
    borderRadius: 10,
  },
});

export { ForumPage };
