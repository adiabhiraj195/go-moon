'use client';
import { useWallet } from "@/contexts/WalletProvide";
import { ethers } from "ethers";
import { nftAbi } from "@/constants/BaseNft";
import { useEffect, useState } from "react";
import { ABI, CONTRACT_ADDRESS } from "@/constants/contractConfig";

interface NFTCardProps {
    tokenId: string;
    ownerAddress: string;
    name: string;
    nftAddress: string;
    price: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ tokenId, ownerAddress, name, nftAddress, price }) => {
    const [image, setImage] = useState("");
    const { provider, account } = useWallet();
    // console.log(account, ownerAddress)
    const getTokenUri = async (tokenId: string) => {
        const signer = provider?.getSigner();

        const nftContract = new ethers.Contract(
            nftAddress,
            nftAbi,
            signer
        );

        const tx = await nftContract.tokenURI(tokenId);
        // await tx.wait();
        return tx
    }

    const updateCard = async () => {
        const tokenUri = await getTokenUri(tokenId);

        if (tokenUri) {
            const requestURL = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/")
            setImage(requestURL)

        }
    }

    const cancleListing = async () => {
        const signer = provider?.getSigner();

        const marketContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ABI,
            signer
        );

        const tx = await marketContract.cancelListing(nftAddress, tokenId);

        console.log(tx);
    }

    useEffect(() => {
        updateCard();
    }, [])
    // console.log(getTokenUri());
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-300 bg-black">
            {/* NFT Image */}
            {/* <img className="w-full" src={""} alt={`NFT ${name}`} /> */}
            <p>{image}</p>

            {/* NFT Details */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name || `NFT #${tokenId}`}</div>
                <p className="text-gray-700 text-base">
                    <strong>Token ID:</strong> {tokenId}
                </p>
                <p className="text-gray-700 text-base">
                    <strong>Owner:</strong> {ownerAddress.slice(0, 6)}...{ownerAddress.slice(-4)}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                </button>

                <button
                    onClick={cancleListing}
                    disabled={ownerAddress.toLocaleLowerCase() !== account?.toLocaleLowerCase()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    cancle listing
                </button>

            </div>
        </div>
    );
};

export default NFTCard;