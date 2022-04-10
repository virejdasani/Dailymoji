import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import { Flex, Box, Button, Text, Heading } from "@chakra-ui/react";
import EmojiCard from "./components/EmojiCard";
import EmojiPanel from "./components/EmojiPanel";
import { auth, db, singInWithGoogle, logout } from "./firebase";

function App() {
  const [emojiData, setEmojiData] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // if they already have a username, don't do anything
        } else {
          // if they don't have a firebase displayName, set it to their username
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user logged out
        setUser(null);
      }
    });
    return () => {
      // cleanup the listener
      unsubscribe();
    };
  }, [username, user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser.displayName);

        db.collection(auth.currentUser.uid)
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            setEmojiData(
              snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  emoji: doc.data().emoji,
                  emojiContext: doc.data().emojiContext,
                  timestamp: doc.data().timestamp,
                };
              })
            );
          });
      } else {
        // user logged out
      }
    });
    return () => {
      // cleanup the listener
      unsubscribe();
    };
  }, []);

  const sendEmojiData = (emoji) => {
    console.log("sending", emoji);
    db.collection(auth.currentUser.uid).doc().set({
      emoji: emoji,
      emojiContext: "",
      timestamp: new Date().toISOString(),
    });
  };

  const sendContextData = (context, id) => {
    console.log("sending", context, id);
    db.collection(auth.currentUser.uid).doc(id).update({
      emojiContext: context,
    });
  };

  const deleteEmoji = (id) => {
    try {
      db.collection(auth.currentUser.uid).doc(id).delete();
      console.log("deleted", id);
    } catch (e) {
      console.log(e);
    }
  };

  const Today = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    const today = month + "\n" + day + ", " + year;
    return today;
  };

  return (
    <div className="App">
      <Flex>
        <Navbar
          username={
            auth.currentUser && auth.currentUser.displayName
              ? "Welcome back, " + auth?.currentUser.displayName
              : ""
          }
          user={user}
          logout={logout}
          singInWithGoogle={singInWithGoogle}
          auth={auth}
        />
      </Flex>

      {auth.currentUser ? (
        <>
          <Flex
            flexDir="column"
            maxW={800}
            align="center"
            mx="auto"
            px={4}
            mt={24}
            mb={4}
          >
            <Heading id="dateText">{Today()}</Heading>
          </Flex>
          <Flex flexDir="column" maxW={800} align="center" mx="auto" px={4}>
            {emojiData.map((emoji, index) => (
              <EmojiCard
                emoji={emoji.emoji}
                emojiContext={emoji.emojiContext}
                timestamp={emoji.timestamp}
                key={emoji.id}
                id={emoji.id}
                deleteEmoji={deleteEmoji}
                sendContextData={sendContextData}
              />
            ))}
          </Flex>
          {/* {emojis.map((t, i) => {
        return (
          <EmojiCard
            key={i}
            t={t}
            i={i}
            // this is required to be passed so it can be linked to the delete icon on every EmojiCard
            timeID={timeID[i]}
            deleteEmoji={deleteEmoji}
            context={context[i]}
            sendData={sendData}
            sendContextData={sendContextData}
          />
        );
      })} */}
          <Flex flexDir="column" maxW={800} align="center" mx="auto" px={4}>
            <Flex position="fixed" bottom="30px" zIndex={9}>
              <EmojiPanel sendEmojiData={sendEmojiData} />
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            flexDir="column"
            maxW={800}
            align="center"
            mx="auto"
            px={4}
            mt={20}
          >
            <button onClick={user ? logout : singInWithGoogle}>
              {auth.currentUser && auth.currentUser.displayName ? (
                <p>Logout</p>
              ) : (
                <>
                  <div class="google-btn">
                    <img
                      className="google-icon-svg"
                      alt="google button"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                    <p className="btn-text">
                      <b>Sign in with Google</b>
                    </p>
                  </div>
                </>
              )}
            </button>
          </Flex>
        </>
      )}
    </div>
  );
}

export default App;
