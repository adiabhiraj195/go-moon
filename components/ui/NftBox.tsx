'use client';

import { useWallet } from "@/contexts/WalletProvide";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ApeWorldContract } from "@/utils/ethersContract";

interface NFTCardProps {
    tokenId: string;
    ownerAddress: string;
    nftAddress: string;
    price: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ tokenId, ownerAddress, nftAddress, price }) => {
    const [image, setImage] = useState("");
    const [nftMetadata, setNftMetadata] = useState<any>({});
    const { signer } = useWallet();
    // console.log(account, ownerAddress)

    const getTokenUri = async (tokenId: string) => {

        const nftContract = ApeWorldContract(nftAddress, signer)

        const tx = await nftContract.tokenURI(tokenId);

        return tx
    }

    const updateCard = async () => {
        const tokenUri = await getTokenUri(tokenId);

        if (tokenUri) {
            const requestURL = JSON.parse(tokenUri);
            setNftMetadata(requestURL);
            setImage(requestURL.image);
        }
    }

    useEffect(() => {
        updateCard();
    }, [])

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-300 bg-black">
            {/* NFT Image */}
            <img className="w-full" src={nftMetadata.image} alt={`NFT ${nftMetadata.name}`} />
            {/* <p>{image}</p> */}

            {/* NFT Details */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{nftMetadata.name || `NFT #${tokenId}`}</div>
                <p className="text-gray-700 text-base">
                    <strong>Token ID:</strong> #{tokenId}
                </p>
                <p className="text-gray-700 text-base">
                    <strong>Owner:</strong> {ownerAddress.slice(0, 6)}...{ownerAddress.slice(-4)}
                </p>
                <p className="text-gray-700 text-base">
                    <strong>Price:</strong> {ethers.formatEther(price)}
                </p>
            </div>

        </div>
    );
};

export default NFTCard;