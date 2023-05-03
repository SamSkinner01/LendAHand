import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationBar } from "../components/navigationBar";
import { useState, useEffect } from "react";
import { getProfilePosts } from "../auth/firebaseConfig";
import { RenderEvents } from "../components/RenderEvents";
import ForumPost from "../components/ForumPost";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../auth/firebaseConfig";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Refresh from "../assets/Refresh.png";

function ProfileForumPosts() {
  const [refresh, setRefresh] = useState(false);

  const [user, setUser] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [comments, setComments] = useState([[]]);
  const [id, setID] = useState([]);

  useEffect(() => {
    async function getForumPosts() {
      setUser([]);
      setTitle([]);
      setDescription([]);
      setComments([]);
      setID([]);

      try {
        const forumRef = collection(db, "forum_posts");
        const q = query(
          forumRef,
          where("email", "==", auth.currentUser.email),
          orderBy("time", "desc")
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          setUser((user) => [...user, data.username]);
          setTitle((title) => [...title, data.title]);
          setDescription((description) => [...description, data.description]);
          setComments((comments) => [...comments, data.comments]);
          setID((id) => [...id, doc.id]);
        });
      } catch (error) {
        console.log(error);
      }
    }

    getForumPosts();
  }, [refresh]);

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "forum_posts", postId));
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.header_text}>Your Forum Posts</Text>
        <TouchableOpacity onPress={() => setRefresh(!refresh)}>
          <Image source={Refresh} style={styles.icons} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {user.map((user, index) => {
            return (
              <View key={index} style={styles.post}>
                <ForumPost
                  title={title[index]}
                  description={description[index]}
                  user={user}
                  comments={comments[index]}
                  id={id[index]}
                  canDelete={true}
                  handleDelete={handleDelete}
                />
              </View>
            );
          })}
        </ScrollView>
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
  },
  header: {
    backgroundColor: "#00548e",
    padding: 10,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    width: 25,
    height: 25,
  },
  header_text: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#00548e",
  },
});

export { ProfileForumPosts };
