"use client"
import React, { useEffect, useState } from 'react'
import { useWallet } from '@/contexts/WalletProvide'
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from '@/constants/contractConfig';

import { Outfit, Staatliches } from "@next/font/google";

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})


const outfit = Outfit({
    weight: ["400"],
    subsets: ['latin']
})

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
            const marketContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                ABI,
                signer
            );
            const tx = await marketContract.getBalance();
            if (!tx) {
                return
            }
            const result = tx.toString();
            setBalance(ethers.formatEther(result));
            console.log(balance + " balance", ethers.formatEther(result))

            // const tx = await marketContract.withdrawProceeds();
            // tx.wait();


            // console.log("balace: ", tx)
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
            const marketContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                ABI,
                signer
            );

            const tx = await marketContract.withdrawProceeds();

            getBalance();

            // console.log("balace: ", tx)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        getBalance();
    }, [])
    return (
        <div className='self-end flex flex-col'>
            <p className={`${outfit.className} self-end mx-4`}>
                <strong>Balance: </strong>{balance != "" ? balance : 0}
            </p>
            <button
                onClick={handleWithdraw}
                disabled={loading}
                className={`${statliche.className} hover:bg-gradient-to-l hover:from-fuchsia-200 hover:to-sky-300 btn rounded-l text-2xl text-center w-48`}
            >
                {loading ? "withdrowing" : "Withdraw"}

            </button>
        </div>
    )
}
