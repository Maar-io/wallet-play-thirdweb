import { Web3Button, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { INVENTORY_NFT_CONTRACT_ADDRESS } from "../const/addresses";

import styles from "../styles/Home.module.css";

export default function ClaimInventory() {
    // Connected wallet address
    const address = useAddress();
    // Inventory NFT balance
    const {
        contract: inventoryNftContract
    } = useContract(INVENTORY_NFT_CONTRACT_ADDRESS);
    console.log("NFT Contract", INVENTORY_NFT_CONTRACT_ADDRESS);
    const {
        data: ownedInventory,
        isLoading: isInventoryLoading,
    } = useOwnedNFTs(inventoryNftContract, address);
    console.log("Owned Inventory2 NFTs", ownedInventory?.length);

    return (
        <div className={styles.inventory}>
            <div className={styles.claimButton}>
                {(ownedInventory && ownedInventory.length < 3) &&
                    <Web3Button
                        contractAddress={INVENTORY_NFT_CONTRACT_ADDRESS}
                        action={(contract) => contract.erc1155.claim(ownedInventory.length, 1)}
                    >Claim Gacha</Web3Button>
                }
            </div>
        </div >
    )
}
