import SellNFTForm from '@/components/SellNftForm';
import WithdrawEth from '@/components/Money-withdraw';

export default function SellNftPage() {


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sell Your NFT</h1>
            <SellNFTForm />
            <WithdrawEth />
        </div>
    );
}