"use client"
import React from 'react'
import { useWallet } from '@/contexts/WalletProvide'
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI } from '@/constants/contractConfig';

export default function BuyButton({ ownerAddress, nftAddress, tokenId, nftPrice }: {
    ownerAddress: string;
    nftAddress: string;
    tokenId: string;
    nftPrice: string;
}) {
    const { isConnected, provider, signer } = useWallet();

    async function handleBuy() {
        if (!isConnected) {
            return
        }

        try {
            const marketContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                ABI,
                signer
            );
            const price = ethers.parseEther(nftPrice)

            const tx = await marketContract.buyItem(nftAddress, tokenId, {
                value: price
            });

        } catch (error) {

        }
    }
    return (
        <button
            onClick={handleBuy}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
            Buy
        </button>
    )
}
