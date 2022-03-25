import React from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Header from "../components/Header";
import DemoPageLinks from "../components/DemoPageLinks";
import Navbar from "../components/Navbar";

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
};

const Demo = () => {
  const AuthUser = useAuthUser();
  return (
    <div>
      <>
        <Navbar />
      </>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Home</h3>
        </div>
        <DemoPageLinks />
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
