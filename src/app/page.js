'use client';

import styles from "./Maulick.module.css";
import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {collection, addDoc} from "firebase/firestore";
// import {database} from "firebase/database";
import { getDatabase, ref, set, onValue, push, onDisconnect, serverTimestamp, runTransaction } from "firebase/database";
// import {database} from "firebase/database";
// import { ref, set, OnDisconnect } from "firebase/database";
import {app} from "../lib/firebase"; // make sure this is your initialized Firebase app

function Maulick() {
  return (
    <img className={styles.img}
      src="maulick.jpeg"
      alt="maulick"
    />
  );
}

async function addOnlineUser(user) {

  const db = getFirestore(app);

  try {
    const docRef = await addDoc(collection(db, 'onlineUsers'), {
      uid: user.uid,
    });
    console.log("collection added, ", docRef.id);
  } catch (e) {
    console.error("could not add ", docRef.id);
  }
}

function ChatBox() {
  const [user, setUser] = useState(null);
  const [onlineCount, setOnlineCount] = useState(0); // placeholder for now

  const countUpdated = useRef(false);

  console.log("inside chatbox");
  useEffect(() => {
    console.log("inside use effect");
    const auth = getAuth(app);

    console.log("inside use effect");

    const db = getDatabase();

    

    const unsubscribe = onAuthStateChanged(auth, (usersignedin) => {
      if(usersignedin) {
        // user is signed in
        const userId = usersignedin.uid;

        const myConnectionsRef = ref(db, `users/${userId}/connections`);
        const lastOnlineRef = ref(db, `users/${userId}/lastOnline`);
        const connectedRef = ref(db, '.info/connected');

        const onlineUserList = ref(db, "onlineUserList");
        
        // set(ref(db, `/online/${userId}`), {
        //   online: true,
        // });
        // const reference = ref(database, `/online/${userId}`);
        // const reference = ref(database`/online/${userId}`);

        // reference.set(true).then(() => console.log("User is online"));

        // await set(reference, true);
        // OnDisconnect(reference).remove();

        console.log("User is online");

        onValue(onlineUserList, (snapshot) => {
          const data = snapshot.val();
          const onlineCount = data ? Object.keys(data).length : 0;
          setOnlineCount(onlineCount);
        });

        setUser(auth.currentUser);
        // setOnlineCount(onlineCount + 1);

        onValue(connectedRef, (snap) => {
          if (snap.val() === true) {
            const con = push(myConnectionsRef);

            const userListRef = push(onlineUserList);

            set(userListRef, 'online');

            // runTransaction(onlineUserCountRef, (count) => {
            //   return (count || 0) + 1;
            // });

            // set(onlineUserCountRef, )
            onDisconnect(con).remove();

            set(con, true);

            onDisconnect(lastOnlineRef).set(serverTimestamp());

            onDisconnect(userListRef).remove();
          }
        // reference
        //   .onDisconnect()
        //   .remove()
        //   .then(() => console.log("User disconnected"));
      });
    }
      else {
        // sign in the user
        console.log("signing in anon");
        signInAnonymously(auth)
      .then(() => {
        const userId = auth.currentUser.uid;
        console.log("Signed in anonymously");
        
        addOnlineUser(auth.currentUser);
        
      })
      .catch((error) => {
        console.error("Auth error:", error.message);
      });
      }
    })

    return () => unsubscribe(); 
  }, []);

  console.log("on way to return");

  return (
    <section>
      <Maulick />
      <h1>Message</h1>
      <label>Online Users: {onlineCount}</label><br />
      <label>User ID: {user ? user.uid : "Signing in..."}</label>
    </section>
  );
}

export default function Gallery() {
  console.log("Hello World");
  return (
    <ChatBox />
  );
}
// import Gallery from "./Gallery.js";

// export default function App() {
//   return (
//     <Gallery/>
//   )
// }

  // useEffect(() => {
  //   const auth = getAuth(app);

  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       // User already signed in
  //       setUser(user);
  //       const userId = user.uid;

  //       const reference = ref(database, `/online/${userId}`);
  //       await set(reference, true);
  //       onDisconnect(reference).remove();
  //       console.log("User is online:", userId);
  //     } else {
  //       // Not signed in → sign in anonymously
  //       try {
  //         await signInAnonymously(auth);
  //       } catch (err) {
  //         console.error("Anonymous sign-in failed:", err);
  //       }
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);