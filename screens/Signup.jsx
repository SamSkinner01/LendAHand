import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { signup } from '../auth/auth_signup_password';



function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function clearFields(){
        setEmail('');
        setPassword('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Button
                title="Signup"
                onPress={() => {
                    console.log(email, password);
                    signup(email, password)
                    clearFields();
                }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export { Signup };