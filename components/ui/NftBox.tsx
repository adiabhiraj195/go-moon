'use client';

import { useWallet } from "@/contexts/WalletProvide";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ApeWorldContract } from "@/utils/ethersContract";
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
    const [loading, setLoading] = useState(false);
    const [nftMetadata, setNftMetadata] = useState<any>({});
    const { signer, isConnected } = useWallet();
    // console.log(account, ownerAddress)

    const getTokenUri = async (tokenId: string) => {

        const nftContract = ApeWorldContract(nftAddress, signer)

        const tx = await nftContract.tokenURI(tokenId);

        return tx
    }

    const updateCard = async () => {
        setLoading(true)

        const tokenUri = await getTokenUri(tokenId);

        if (tokenUri) {
            const requestURL = JSON.parse(tokenUri);
            setNftMetadata(requestURL);
        }
        setLoading(false)

    }

    useEffect(() => {
        updateCard();
    }, [isConnected])

    if (loading) {
        return (
            <div className="border-2 border-white rounded-xl overflow-hidden w-56 h-72">
                <ThreeDotLoader />
            </div>
        )
    }
    return (
        <div className="border-2 border-white rounded-xl overflow-hidden w-56">
            {/* NFT Image */}
            <div className="w-full h-56 bg-cover bg-center overflow-hidden relative">
                <img className="absolute h-full object-cover w-full " src={nftMetadata.image} alt={`NFT ${nftMetadata.name}`} />
            </div>

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
const ThreeDotLoader = () => {
    return (
        <div className="flex items-center justify-center bg-black bg-opacity-50 h-full">
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
            </div>
        </div>
    );
};
export default NFTCard;