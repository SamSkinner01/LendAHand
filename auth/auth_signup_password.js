/*
    Signs up a user with an email and password.
*/
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

export const signup = (userDetails) => {
    //deconstruct the users details we will need these later
    const {username, firstname, lastname, email, password} = userDetails
        //user firebase using the appropriate firebase method
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            try{
                addDoc(collection(db, "users"), {
                    email: email,
                    first_name: firstname,
                    last_name: lastname,
                    username: username,
                    total_hours: 0,
                    is_organization: false,
                    social_media_posts : [],
                    forum_posts : [],
                    events_volunteered : [],
                    signed_up_for_events: [],
                    created_events: [],
                    chat_rooms: [],
                    friends: [],
                    friend_requests: [],
                    friend_requests_sent: [],
                  });
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
        })
        //we need to catch the whole sign up process if it fails too.
        .catch((error) => {
            console.log("Error signing up: ", error)
        }
    )
}
