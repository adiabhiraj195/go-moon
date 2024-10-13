"use client"
import React, { useEffect, useState } from 'react'
import { useWallet } from '@/contexts/WalletProvide'
import { ethers } from "ethers";
import { MarketContract } from '@/utils/ethersContract';

export default function WithdrawEth() {
    const { signer, isConnected } = useWallet();
    const [balance, setBalance] = useState("");
    const [loading, setLoading] = useState(false);

    async function getBalance() {
        if (!isConnected) {
            return;
        }
        console.log("hii")
        try {
            const marketContract = MarketContract(signer);

            const tx = await marketContract.getBalance();

            if (!tx) {
                return
            }

            const result = tx.toString();
            setBalance(ethers.formatEther(result));
            console.log(balance + " balance", ethers.formatEther(result))

        } catch (error) {
            console.log(error);
        }
    }

    async function handleWithdraw() {
        if (!isConnected) {
            return;
        }
        setLoading(true)

        try {
            const marketContract = MarketContract(signer);

            const tx = await marketContract.withdrawProceeds();

            getBalance();

        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        getBalance();
    }, [])
    return (
        <div>
            <p>
                <strong>Balance: </strong>{balance != "" ? balance : 0}
            </p>
            <button
                onClick={handleWithdraw}
                disabled={loading}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                {loading ? "withdrowing" : "Withdraw"}

            </button>
        </div>
    )
}
