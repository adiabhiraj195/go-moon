'use client';

import { useWallet } from '@/contexts/WalletProvide';

const ConnectWalletButton: React.FC = () => {
    const { account, connectWallet, disconnectWallet, isConnected } = useWallet();

    return (
        <div>
            {isConnected ? (
                <div>
                    <p>Connected: {account?.slice(0, 6)}...</p>
                    <button
                        onClick={disconnectWallet}
                        className="p-2 bg-red-500 text-white rounded-md"
                    >
                        Disconnect Wallet
                    </button>
                </div>
            ) : (
                <button
                    onClick={connectWallet}
                    className="p-2 bg-green-500 text-white rounded-md"
                >
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default ConnectWalletButton;