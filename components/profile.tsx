import { ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs, useTokenBalance } from "@thirdweb-dev/react";
import { PROFILE_NFT_CONTRACT_ADDRESS, INVENTORY_NFT_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../const/addresses";

import styles from "../styles/Home.module.css";
import ClaimInventory from './claiminventory';

export default function Profile() {
    // Connected wallet address
    const address = useAddress();

    // Profile NFT balance
    const {
        contract: profileNftContract
    } = useContract(PROFILE_NFT_CONTRACT_ADDRESS);
    console.log("NFT Contract", PROFILE_NFT_CONTRACT_ADDRESS);
    console.log("Profile NFT Contract", profileNftContract);
    const {
        data: ownedProfile,
        isLoading: isownedProfileLoading,
    } = useOwnedNFTs(profileNftContract, address);
    console.log("Owned NFTs", ownedProfile);

    // Inventory NFT balance
    const {
        contract: inventoryNftContract
    } = useContract(INVENTORY_NFT_CONTRACT_ADDRESS);
    console.log("NFT Contract", INVENTORY_NFT_CONTRACT_ADDRESS);
    console.log("Profile NFT Contract", profileNftContract);
    const {
        data: ownedInventory,
        isLoading: isInventoryLoading,
    } = useOwnedNFTs(inventoryNftContract, address);
    console.log("Owned Inventory NFTs", ownedInventory);

    // Token balance
    const {
        contract: tokenContract
    } = useContract(TOKEN_CONTRACT_ADDRESS);
    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
    } = useTokenBalance(tokenContract, address);
    console.log(address, tokenBalance);


    function truncateAddress(address: string) {
        if (address) {
            console.log(address);
            return `${address?.slice(0, 6)}...${address.slice(-4)}`;
        }
        return "..."
    }

    return (
        <div >
            {address &&
                <>
                    <h3>Profile NFT{": "}
                        {!isownedProfileLoading && (
                            ownedProfile && ownedProfile.length)}

                    </h3>
                    <div className={styles.monsterGrid}>
                        {!isownedProfileLoading && (
                            ownedProfile && ownedProfile.length > 0 ? (
                                ownedProfile.map((monster: any, index: number) => (
                                    <div
                                        key={index}
                                        className={styles.monsterCard}
                                    >
                                        <ThirdwebNftMedia
                                            metadata={monster.metadata}
                                            style={{
                                                overflow: "hidden",
                                                borderRadius: "6px",
                                            }}
                                        />
                                        <p>{monster.metadata.name}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No Profile image</p>
                            )
                        )}
                    </div>
                    <h3>Gacha Inventory{": "}
                        {!isInventoryLoading && (
                            ownedInventory && ownedInventory.length)}

                    </h3>
                    <div className={styles.inventory}>
                        {!isInventoryLoading && (
                            ownedInventory && ownedInventory.length > 0 ? (
                                ownedInventory.map((monster: any, index: number) => (
                                    <div
                                        key={index}
                                        className={styles.monsterCard}
                                    >
                                        <ThirdwebNftMedia
                                            metadata={monster.metadata}
                                            style={{
                                                overflow: "hidden",
                                                borderRadius: "6px",
                                                display: "inline"
                                            }}
                                        />
                                        <p>{monster.metadata.name}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No Profile image</p>
                            )
                        )}
                    </div>
                    {/* <ClaimInventory /> */}
                </>}
            <div className={styles.inventory}>
                <ClaimInventory />
            </div>
        </div>

    )
};