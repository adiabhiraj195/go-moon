'use client';

import { useWallet } from "@/contexts/WalletProvide";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ApeWorldContract } from "@/utils/ethersContract";
import { ABI, CONTRACT_ADDRESS } from "@/constants/contractConfig";

import { Outfit, Staatliches } from "@next/font/google";

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})


const outfit = Outfit({
    weight: ["400"],
    subsets: ['latin']
})

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
        <div className="border-2 border-white rounded-xl overflow-hidden w-56">
            {/* NFT Image */}
            <img className="w-full h-2/4" src={nftMetadata.image} alt={`NFT ${nftMetadata.name}`} />
            {/* <p>{image}</p> */}

            {/* NFT Details */}
            <div className="px-6 py-4">
                <div className={`${statliche.className} font-bold text-2xl mb-2 flex justify-between`}>
                {nftMetadata.name || `NFT #${tokenId}`}
                <div>
                <p className="text-gray-400 text-base border-2 rounded-lg px-2 border-gray-400">
                    #{tokenId}
                </p>
                </div>   

                </div>
                <div className="flex gap-1">
                    <p className={`${statliche.className} text-lg`}>
                    Owner :
                    </p>
                    <p className={`${statliche.className} text-lg text-gray-400`}>
                    {ownerAddress.slice(0, 6)}...{ownerAddress.slice(-4)}
                    </p>
                </div>
                <div className="flex gap-1">
                <p className={`${statliche.className} text-lg`}>
                Price :
                </p>
                <p className={`${statliche.className} text-lg text-gray-400`}>
                {ethers.formatEther(price)}
                </p>
                </div>
            </div>

        </div>
    );
};

export default NFTCard;