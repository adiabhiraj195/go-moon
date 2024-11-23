import NFTCard from "@/components/ui/nft-card";
import { getAllActiveListings } from "@/data-access/listing";
import LinkProvider from "@/components/link";
import HeroSection from "@/components/hero";
import HomeFilter from "@/components/home-filter";
import NftListCard from "@/components/ui/nft-list-card";
import Link from "next/link";

export default async function Home() {
  const listings = await getAllActiveListings();

  // console.log(listings)
  return (
    <div className="flex w-full flex-col p-4 px-8">
      <HeroSection nftItems={listings} />

      <div>

        <HomeFilter />

        <div className="">
          <div className="p-4 bg-black text-white">

            <table className="w-full border-collapse table-auto text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">NFT</th>
                  <th className="py-3 px-4">Token Id</th>
                  <th className="py-3 px-4">Price</th>
                </tr>
              </thead>

              {/* data map here */}
              <tbody>
                {
                  listings?.map((item: any, index) => (
                    <NftListCard
                      key={index}
                      id={item.nftId}
                      rank={index + 1}
                      logo={item.nft.imageURI}
                      tokenId={item.nft.tokenId}
                      price={item.price}
                      seller={item.seller.address}
                    />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="flex gap-4">

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

        </div> */}
      </div>
    </div>
  );
}

