import SellNFTForm from '@/components/SellNftForm';
import { ABI } from '@/constants/contractConfig'; // Import the ABI of your contract

export default function SellNftPage() {
    const marketplaceAddress = '0xYourMarketplaceContractAddress'; // Replace with your deployed marketplace contract address

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sell Your NFT</h1>
            <SellNFTForm marketplaceAddress={marketplaceAddress} marketplaceAbi={ABI} />
        </div>
    );
}