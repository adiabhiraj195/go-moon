import NFTCard from "@/components/ui/nft-card";
import { getAllActiveListings } from "@/data-access/listing";
import { Staatliches } from "@next/font/google";
import LinkProvider from "@/components/link";

const staat = Staatliches({
  weight: ['400'],
  subsets: ['latin']
})

export default async function Home() {
  const listings = await getAllActiveListings();
  // console.log(listings)
  return (
    <div className="flex w-full flex-col p-4">
      <h1 className={`${staat.className} font-bold text-start text-3xl m-2`}>All NFTs ▼</h1>

      <div className="flex gap-4">

        {listings?.map((item: any) => {
          return (
            <LinkProvider href={`/nft/${item.nftId}`} key={item.id}>
              <NFTCard
                imageUrl={item?.nft.imageURI}
                tokenId={item.nft.tokenId}
                price={item.price}
                seller={item.seller.address}
              />
            </LinkProvider>
          )
        })}

      </div>
    </div>
  );
}
