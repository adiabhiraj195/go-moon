import SellNFTForm from '@/components/SellNftForm';
import WithdrawEth from '@/components/Money-withdraw';
import { Staatliches } from "@next/font/google";
import AddNewNftForm from '@/components/add-new-nft-form';

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})


export default function AddNftPage() {


    return (
        <div className="container flex flex-col w-full items-center mx-auto p-4">
            <h1 className={`${statliche.className} text-4xl`}>Add Your NFT</h1>
            <AddNewNftForm />
            <WithdrawEth />
        </div>
    );
}