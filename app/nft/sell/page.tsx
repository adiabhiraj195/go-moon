import SellNFTForm from '@/components/SellNftForm';
import WithdrawEth from '@/components/Money-withdraw';
import { Staatliches } from "@next/font/google";

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})


export default function SellNftPage() {


    return (
        <div className="container flex flex-col w-3/5 items-center mx-auto p-4">
            <h1 className={`${statliche.className} text-4xl`}>Sell Your NFT</h1>
            <SellNFTForm marketplaceAddress={CONTRACT_ADDRESS} marketplaceAbi={ABI} />
            <WithdrawEth />
        </div>
    );
}