"use client"
import React from 'react'
import { useWallet } from '@/contexts/WalletProvide'
import { ethers } from 'ethers';
import { MarketContract } from '@/utils/ethersContract';

import { Outfit, Staatliches } from "@next/font/google";

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})

const outfit = Outfit({
    weight: ["400"],
    subsets: ['latin']
})

export default function BuyButton({ ownerId, nftId, nftAddress, tokenId, nftPrice }: {
    nftId: string;
    nftAddress: string;
    tokenId: string;
    nftPrice: string;
    ownerId: string;
}) {
    const { isConnected, signer } = useWallet();

    async function handleBuy() {
        if (!isConnected) {
            return
        }

        try {
            const marketContract = MarketContract(signer)
            const price = ethers.parseEther(nftPrice)

            const tx = await marketContract.buyItem(nftAddress, tokenId, {
                value: price
            });

            const txRecipt = await tx.wait();

            await fetch(`/api/nft/buy/${nftId}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sellerId: ownerId,
                    txHash: txRecipt.hash,
                    price
                })
            })
            console.log("buyed")
        } catch (error) {

        }
    }
    return (
        <button
            onClick={handleBuy}
            className={`${statliche.className} hover:bg-gradient-to-l hover:from-fuchsia-200 hover:to-sky-300 btn rounded-l text-2xl text-center w-48`}
        >
            Buy
        </button>
    )
}
