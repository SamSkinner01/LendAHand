import { NavigationBar } from "../components/navigationBar";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth, db } from "../auth/firebaseConfig";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
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

        setUser((user) => [...user, data.user]);
        setTitle((title) => [...title, data.title]);
        setDescription((description) => [...description, data.description]);
        setComments((comments) => [...comments, data.comments]);
        setID((id) => [...id, doc.id]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getForumPosts();
  }, []);

  return (
    <>
      <FlatList
        data={description}
        renderItem={({ item, index }) => (
          <ForumPost
            user={user[index]}
            title={title[index]}
            description={description[index]}
            comments={comments[index]}
            id={id[index]}
            getForumPosts={getForumPosts}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("Forum");
        }}
        style={styles.container}
      >
        <Text>Post</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          getForumPosts();
        }}
        style={styles.container}
      >
        <Text>Refresh</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("Search Forum");
        }}
        style={styles.container}
      >
        <Text>Search</Text>
      </Pressable>

      <View>
        <NavigationBar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  post: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#202020",
  },
  makePost: {
    flex: 1,
    backgroundColor: "#55009B",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { ForumPage };

