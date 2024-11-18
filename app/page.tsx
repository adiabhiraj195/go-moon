import NFTCard from "@/components/ui/nft-card";
import { getAllActiveListings } from "@/data-access/listing";
import LinkProvider from "@/components/link";
import HeroSection from "@/components/hero";
import HomeFilter from "@/components/home-filter";

export default async function Home() {
  const listings = await getAllActiveListings();

  // console.log(listings)
  return (
    <div className="flex w-full flex-col p-4 px-8">
      <HeroSection nftItems={listings} />

      <div>

        <HomeFilter />

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
    </div>
  );
}

