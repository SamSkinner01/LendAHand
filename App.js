import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {Login} from './screens/login';
import {Signup} from './screens/signup';

export default function App() {
  return (
    <>
    <Signup />
    <Login />
    </>
  );
}
