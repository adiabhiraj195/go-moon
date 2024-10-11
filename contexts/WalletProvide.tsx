'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
    account: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    isConnected: boolean;
    provider: ethers.providers.Web3Provider | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    // Connect to wallet (MetaMask, etc.)
    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            console.error('MetaMask is not installed!');
            return;
        }

        try {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            await web3Provider.send('eth_requestAccounts', []); // Request access to wallet
            const signer = web3Provider.getSigner();
            console.log(web3Provider)
            const userAccount = await signer.getAddress();
            const network = await web3Provider.getNetwork();
            console.log(network.ensAddress, network.chainId, network._defaultProvider, network.name, " networks console")

            setProvider(web3Provider);
            setAccount(userAccount);
            setIsConnected(true);
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    // Disconnect the wallet
    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
        setIsConnected(false);
    };

    // Automatically check if wallet is already connected on load
    useEffect(() => {
        const checkWalletConnection = async () => {
            if (window.ethereum) {
                const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await web3Provider.listAccounts();
                if (accounts.length > 0) {
                    setProvider(web3Provider);
                    setAccount(accounts[0]);
                    setIsConnected(true);
                }
            }
        };
        checkWalletConnection();
    }, []);


    return (
        <WalletContext.Provider
            value={{
                account,
                connectWallet,
                disconnectWallet,
                isConnected,
                provider
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

// Custom hook to use the wallet context
export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};