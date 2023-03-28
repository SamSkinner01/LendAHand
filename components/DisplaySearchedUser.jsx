import { View, Text, StyleSheet, Pressable } from 'react-native'
import SearchProfile from '../screens/SearchProfile'
import { useNavigation } from "@react-navigation/native";

function DisplaySearchedUser( {item}){
    const navigation = useNavigation();

    return ( 
        <Pressable onPress={() => navigation.navigate("Search Profile", { userInfo: item })}>

            <View style={styles.userContainer}>
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.username}</Text>
                </View>
            </View>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  }
})

export default DisplaySearchedUser