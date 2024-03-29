import { StyleSheet, Text, View, TextInput, Button, Alert, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import { signin } from "../auth/auth_signin_password";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";
import logo from "../assets/logo.png";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userSubmit, setUserSubmit] = useState(false);

  function isUserLoggedIn() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }

  function clearFields() {
    setEmail("");
    setPassword("");
  }

  function navigateToEvents() {
    navigation.navigate("Events");
  }

  useEffect(() => {
    if (loggedIn && auth.currentUser.emailVerified === true) {
      navigateToEvents();
    }
    if(loggedIn && auth.currentUser.emailVerified === false){
      Alert.alert("Please verify your email before logging in.");
      auth.signOut();
    }

    
  }, [loggedIn]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={[styles.logo]} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Pressable
        onPress={() => {
          signin(email, password)
            .then(() => {
              isUserLoggedIn();
              setUserSubmit(!userSubmit);
              clearFields();
            })
            .catch((error) => {
              Alert.alert("Login failed", error.message);
            });
        }}
        style={styles.button_prim}
      >
        <Text style={styles.text_prim}>Login</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          clearFields();
          navigation.navigate("Signup");
        }}
        style={styles.button_sec}
      >
        <Text style={styles.text_sec}>Don't have an account? Sign Up</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    paddingVertical: '45%',
  },
  input: {
    width: '85%',
    padding: 15,
    marginVertical: 3,
    borderRadius: 5,
    borderColor: '#070B47',
    borderWidth: 1,
    borderRadius: 5,

  },
  button_prim:{
    width: '75%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#070B47',
  },
  text_prim:{
    fontWeight: 'bold',
    color: 'white',
  },
  button_sec:{
    width: '75%',
    padding: 5,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  text_sec:{
    fontWeight:'bold',
    color: '#536878',
  },
  logo:{
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
},
});

export { Login };
