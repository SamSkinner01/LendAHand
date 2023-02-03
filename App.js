import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {Login} from './screens/Login';
import {Signup} from './screens/Signup';

export default function App() {
  return (
    <>
    <Signup />
    <Login />
    </>
  );
}
