import NFTCard from '@/components/ui/nft-card'
import { getAllNftOfUser } from '@/data-access/nft';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import WithdrawEth from '@/components/Money-withdraw';
import Link from 'next/link';

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return (
            <div>
                you are unauthorised
            </div>
        )
    }
    const data = await getAllNftOfUser(session?.user.id as string);
    // console.log(data)
    return (
        <div className='w-full h-full px-8'>
            {(data && data?.length > 0) ?
                <div className='flex'>
                    {data?.map((item: any) => {
                        return (
                            <Link href={`/account/${item.id}`} key={item.id} className='my-2 mx-3'>
                                <NFTCard
                                    tokenId={item.tokenId}
                                    // seller={item.ownerId}
                                    imageUrl={item.imageURI}
                                />
                            </Link>
                        )
                    })}
                </div> :
                <h1 className='flex justify-center font-bold text-lg my-3 h-full'>
                    You haven&apos;t added any NFT yet
                </h1>
            }
            <WithdrawEth />
        </div>
    )
}
