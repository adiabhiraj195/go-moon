import NFTCard from '@/components/ui/nft-card'
import { getAllNftOfUser } from '@/data-access/nft';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LinkProvider from '@/components/link';

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
        <div>
            <p>or what ever digvijay singh malik design </p>

            <div className='flex'>
                {data?.map((item: any) => {
                    return (
                        <LinkProvider href={`/nft-assets/${item.id}`} key={item.id}>
                            <NFTCard
                                tokenId={item.tokenId}
                                // seller={item.ownerId}
                                imageUrl={item.imageURI}
                            />
                        </LinkProvider>

                    )
                })}
            </div>
        </div>
    )
}
