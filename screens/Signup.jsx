import { StyleSheet, Text, View, TextInput, Button, Alert,Pressable,Image} from "react-native";
import { useState,useEffect } from "react";
import { signup } from "../auth/auth_signup_password";
import logo from "../assets/logo.png"
import { Login } from "./Login";

function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function clearFields() {
    setEmail("");
    setPassword("");
  }


  return (
    <View style={styles.container}>
      <Image source={logo} style={[styles.logo]} resizeMethod="contain"/>
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

        <Pressable onPress={() => {
          console.log(email, password);
          signup(email, password);
          clearFields();
        }}
          style={styles.button_sec}>
            <Text style={styles.text_prim}>Sign Up</Text>
         </Pressable>

        <Pressable onPress={()=> navigation.navigate("Login")}
          style={styles.button_sec}>
            <Text style={styles.text_sec}>Already Have an Account? Login</Text>
         </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbc6c3",
    alignItems: "center",
    paddingVertical: '45%'
  },
  input: {
    width: '85%',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#070B47',
    borderWidth: 1,
    borderRadius: 5,
  },
  button_sec:{
    width: '85%',
    padding: 3,
    alignItems: 'center',
    borderRadius: 5,
  },
  text_prim:{
    fontWeight:'bold',
    color: '#536878',
    fontSize: 17,
  },
  text_sec:{
    fontWeight:'bold',
    color: '#536878',
    fontSize: 15,
  },
  logo:{
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
},
});

export { Signup };