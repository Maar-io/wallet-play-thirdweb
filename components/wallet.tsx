import styles from "../styles/Home.module.css";
import {
    ConnectWallet,
} from "@thirdweb-dev/react";
import { TOKEN_CONTRACT_ADDRESS } from "../const/addresses";

export default function Wallet() {

    return (
        <div className={styles.connect}>
            <ConnectWallet
                theme={"light"}
                btnTitle={"zkAstar Connect"}
                supportedTokens={{
                    [80001]: [
                        {
                    address: TOKEN_CONTRACT_ADDRESS,
                    name: "GachaDrom",
                    symbol: "GLDR2",
                    icon: "https://cryptologos.cc/logos/astar-astr-logo.png?v=026"
                        }
                ]                }}
                switchToActiveChain={true}
                modalSize={"wide"}
                hideTestnetFaucet={true}
                displayBalanceToken={{
                    80001: TOKEN_CONTRACT_ADDRESS,
                }}
                welcomeScreen={{
                    img: {
                        src: "https://i.pinimg.com/564x/76/4a/a5/764aa554d1dedac86fe2abf5ea94de6f.jpg",
                        width: 150,
                        height: 300
                    }
                }}
            />
        </div>
    );
}
