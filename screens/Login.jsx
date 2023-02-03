import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import { signin } from '../auth/auth_signin_password';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
            />
            <Button
                title="Login"
                onPress={() => signin(username, password)}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export {Login};