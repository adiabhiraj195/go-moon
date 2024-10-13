'use client';
import { useWallet } from "@/contexts/WalletProvide";
import { ethers } from "ethers";
import { nftAbi } from "@/constants/BaseNft";
import { useEffect, useState } from "react";
import { ABI, CONTRACT_ADDRESS } from "@/constants/contractConfig";
import BuyButton from "./Buy-nft-button";

interface NFTCardProps {
    tokenId: string;
    ownerAddress: string;
    nftAddress: string;
    price: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ tokenId, ownerAddress, nftAddress, price }) => {
    const [image, setImage] = useState("");
    const [nftMetadata, setNftMetadata] = useState<any>({});
    const { account, signer } = useWallet();
    // console.log(account, ownerAddress)
    const getTokenUri = async (tokenId: string) => {

        const nftContract = new ethers.Contract(
            nftAddress,
            nftAbi,
            signer
        );

        const tx = await nftContract.tokenURI(tokenId);
        // await tx.wait();
        // console.log(tx)
        // setNftMetadata(JSON.parse(tx));
        // console.log(nftMetadata, " metadata")
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

    const cancleListing = async () => {
        // const signer = provider?.getSigner();

        const marketContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            ABI,
            signer
        );

        const tx = await marketContract.cancelListing(nftAddress, tokenId);

        console.log(tx);
    }

    useEffect(() => {
        // getTokenUri(tokenId)
        // setNftMetadata(await metadata);
        updateCard();
    }, [])
    // console.log(getTokenUri());
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-300 bg-black">
            {/* NFT Image */}
            <img className="w-full" src={nftMetadata.image} alt={`NFT ${nftMetadata.name}`} />
            {/* <p>{image}</p> */}

            {/* NFT Details */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{nftMetadata.name || `NFT #${tokenId}`}</div>
                <p className="text-gray-700 text-base">
                    <strong>Token ID:</strong> {tokenId}
                </p>
                <p className="text-gray-700 text-base">
                    <strong>Owner:</strong> {ownerAddress.slice(0, 6)}...{ownerAddress.slice(-4)}
                </p>
                <p className="text-gray-700 text-base">
                    <strong>Price:</strong> {ethers.formatEther(price)}
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
                <BuyButton
                    nftPrice={ethers.formatEther(price)}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    ownerAddress={ownerAddress}
                />

            </div>
        </div>
    );
};

export default NFTCard;