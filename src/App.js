import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Flex, Box, Button, Text, Heading, Image } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import EmojiCard from "./components/EmojiCard";
import EmojiPanel from "./components/EmojiPanel";
import DisappearingAlert from "./components/DisappearingAlert";
import Landing from "./components/Landing";
import Landing2 from "./components/Landing2";
import Footer from "./components/Footer";
import { auth, db, singInWithGoogle, logout } from "./firebase";

function App() {
  const [emojiData, setEmojiData] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const [show, setShow] = useState(true);

  // this is to show the alert notification when context is set
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [show]);

  // this is to get and set the auth user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user logged in
        // console.log(authUser);
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

  // this is to get data from firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser.displayName);

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
    // console.log("sending", emoji);
    db.collection(auth.currentUser.uid).doc().set({
      emoji: emoji,
      emojiContext: "",
      timestamp: new Date().toISOString(),
    });
  };

  const sendContextData = (context, id) => {
    if (context) {
      // console.log("sending", context, id);
      db.collection(auth.currentUser.uid).doc(id).update({
        emojiContext: context,
      });
      setShow(true);
    }
  };

  const deleteEmoji = (id) => {
    try {
      db.collection(auth.currentUser.uid).doc(id).delete();
      // console.log("deleted", id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <Flex position="fixed" top="0" w="100%">
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

      {/* test code here */}
      {show ? (
        <Flex flexDir="column" maxW={800} align="center" mx="auto" px={4}>
          <Flex position="fixed" left="10px" top="80px" zIndex={9}>
            <DisappearingAlert
              alertText={auth.currentUser ? "Saved!" : "Welcome"}
            />
          </Flex>
        </Flex>
      ) : (
        ""
      )}

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
            <Heading
              fontFamily="'Work Sans', sans-serif"
              id="dateText"
              fontWeight="400"
              fontSize={"4xl"}
            >
              {moment().format("MMMM D, YYYY")}
            </Heading>
          </Flex>
          <Flex
            flexDir="column"
            maxW={800}
            align="center"
            mx="auto"
            px={4}
            mb="250px"
          >
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
            <Landing />

            <Button
              leftIcon={<FcGoogle />}
              onClick={user ? logout : singInWithGoogle}
              my={7}
              mb={12}
            >
              {auth.currentUser && auth.currentUser.displayName ? (
                <p>Logout</p>
              ) : (
                <p>Sign in with Google</p>
              )}
            </Button>

            <img
              width={"100%"}
              alt=""
              // src="https://raw.githubusercontent.com/virejdasani/Dailymoji/main/assets/img/dailymoji-macbook-preview.png"
              src="https://raw.githubusercontent.com/virejdasani/Dailymoji/main/assets/img/dailymoji-mac-transparent.png"
            ></img>

            <Flex
              flexDir="column"
              maxW={800}
              align="center"
              mx="auto"
              px={4}
              mt={20}
            >
              <Landing2 />
            </Flex>
          </Flex>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
