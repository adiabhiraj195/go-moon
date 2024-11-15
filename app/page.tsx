import NFTCard from "@/components/ui/nft-card";
import { getAllActiveListings } from "@/data-access/listing";
import LinkProvider from "@/components/link";
import FilterBar from "@/components/filter-bar";

export default async function Home() {
  const listings = await getAllActiveListings();

  // console.log(listings)
  return (
    <div className="flex w-full flex-col p-4">
      <FilterBar nftItems={listings} />

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
