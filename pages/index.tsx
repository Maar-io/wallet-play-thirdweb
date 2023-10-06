import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import Wallet from "../components/wallet";
import Navbar from "../components/navbar";
import Profile from "../components/profile";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Navbar />
        <Profile />
      </div>

    </main>
  );
};

export default Home;
