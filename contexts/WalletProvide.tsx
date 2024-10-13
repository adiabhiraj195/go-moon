"use client"

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { ethers } from "ethers";

interface WalletContextType {
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    account: string | null;
    provider: ethers.BrowserProvider | null;
    signer: ethers.Signer | null;
    isConnected: boolean;
    error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Automatically connect if a wallet is already connected
        if (window.ethereum && window.ethereum.selectedAddress) {
            connectWallet();
        }
    }, []);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                setError("MetaMask is not installed!");
                return;
            }

            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            await web3Provider.send("eth_requestAccounts", []); // Request wallet connection
            const signer = await web3Provider.getSigner();
            const account = await signer.getAddress();
            console.log(web3Provider.getNetwork())

            setProvider(web3Provider);
            setSigner(signer);
            setAccount(account);
            setIsConnected(true);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error(err);
            setError("Failed to connect wallet");
        }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setAccount(null);
        setIsConnected(false);
    };

    return (
        <WalletContext.Provider
            value={{
                connectWallet,
                disconnectWallet,
                account,
                provider,
                signer,
                isConnected,
                error,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};