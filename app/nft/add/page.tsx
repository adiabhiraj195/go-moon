import { Staatliches } from "@next/font/google";
import AddNewNftForm from '@/components/add-new-nft-form';
import { getAllNftOfUser } from '@/data-access/nft';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})


export default async function AddNftPage() {
    const session = await getServerSession(authOptions)
    if (session === null) {
        alert("Connect your wallet")
        return
    };
    const listedNft = await getAllNftOfUser(session.user.id as string)
    // const listedNft = undefined

    // console.log(listedNft)
    return (
        <div className="container flex justify-center items-center h-screen relative">
            <div className=' h-full'>

                {listedNft === undefined ?
                    <div className='felx items-start'>
                        <p className='font-bold text-lg my-5'>No NFT is Listed! Yet</p>
                    </div> :
                    <div>
                        {listedNft.map((nft: any, index) => (
                            <div className='my-2 rounded-md overflow-hidden' key={index}>
                                <img src={nft.imageURI} className='w-full' alt="user's asset nft"></img>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='flex justify-center items-center h-screen -top-8 fixed m-8 w-full bg-[#00000033]'>
                <h1 className={`${statliche.className} text-4xl flex flex-col m-4`}>
                    <span className='my-4'>Add</span>
                    <span className='my-4'>Your</span>
                    <span className='my-4'>NFT</span>
                </h1>
                <AddNewNftForm />
            </div>
        </div >
    );
}