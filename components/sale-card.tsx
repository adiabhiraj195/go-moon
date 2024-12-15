import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiTag } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { ethers } from "ethers";
import { MarketContract } from "@/lib/ethersContract";
import { useWallet } from "@/contexts/WalletProvide";

const SaleCard = ({
    nftPrice,
    nftAddress,
    tokenId,
    ownerId,
    nftId
}: {
    nftPrice: string
    nftAddress: string
    tokenId: string
    ownerId: string
    nftId: string
}) => {

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
        <div className="bg-gray1 border border-gray3 my-4 text-white p-6 rounded-xl w-full max-w-3xl shadow-lg">
            {/* Sale Info */}
            <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
                <span>🕒</span>
                <p>Sale ends <strong>15 January 2025</strong> at <strong>9:45 am</strong></p>
            </div>

            {/* Price */}
            <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">Current price</p>
                <div className="flex items-end gap-2">
                    <h1 className="text-4xl font-bold">{nftPrice} ETH</h1>
                    <span className="text-gray-400 text-lg">$***</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
                <button onClick={handleBuy} className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-1/2">
                    Buy now <FaShoppingCart className="ml-2" />
                </button>
                <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md w-1/2">
                    <FiTag className="mr-2" /> Make offer
                </button>
            </div>

            {/* Support Creator */}
            <div className="flex items-center gap-2 mt-6 text-gray-300 text-sm">
                <AiFillHeart className="text-red-500" size={20} />
                <p>
                    <span className="font-bold text-white">Supports creator</span> This listing is paying the collection creator their suggested creator earnings.
                </p>
            </div>
        </div>
    );
};

export default SaleCard;