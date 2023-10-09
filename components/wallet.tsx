import { useEffect } from "react";
import { activeChain } from "../pages/_app";
import styles from "../styles/Home.module.css";
import {
  ConnectWallet,
  ThirdwebSDK,
  WalletInstance,
  isContractDeployed,
  useWallet,
} from "@thirdweb-dev/react";

import { SmartWallet } from "@thirdweb-dev/wallets";

import {
  MONSTER_CONTRACT_ADDRESS,
  PROFILE_NFT_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from "../const/addresses";

export default function Wallet() {
  const wallet = useWallet();

  useEffect(() => {
    const getSdk = async (wallet: SmartWallet) => {
      const address = await wallet.getAddress();
      const sdk = await ThirdwebSDK.fromWallet(wallet, activeChain, {});
      const isDeployed = await isContractDeployed(address, sdk.getProvider());
      console.log("AAAAA", isDeployed, process.env.NEXT_PUBLIC_CLIENT_ID);

      if (!isDeployed) {
        console.log("New account detected...");
        const monsterContract = await sdk.getContract(
          PROFILE_NFT_CONTRACT_ADDRESS
        );
        const tokenContract = await sdk.getContract(TOKEN_CONTRACT_ADDRESS);

        console.log("Creating new account...");
        const tx1 = await monsterContract.erc721.claim(1);

        const tx2 = await tokenContract.erc20.claim(10);
        const transactions = [tx1, tx2];
        debugger;
        console.log("Sending starter monster and initial funds...");
        // const batchTx = await wallet.executeBatch(transactions);
      } else {
        console.log("Trainer account found! Loading monsters...");
      }
    };

    if (wallet && wallet instanceof SmartWallet) {
      getSdk(wallet as SmartWallet);
    }
  }, [wallet]);

  return (
    <div className={styles.connect}>
      <ConnectWallet
        theme={"light"}
        btnTitle={"Connect"}
        switchToActiveChain={true}
        modalSize={"wide"}
        welcomeScreen={{
          img: {
            src: "https://github.com/AstarNetwork/brand-assets/blob/main/Astar%20Identity/logo/symbol/Astar_ring.png",
            width: 150,
            height: 150,
          },
        }}
      />
    </div>
  );
}
