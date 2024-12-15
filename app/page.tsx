
import { getAllActiveListings } from "@/data-access/listing";
import HeroSection from "@/components/hero";
import HomeFilter from "@/components/home-filter";
import NftListCard from "@/components/ui/nft-list-card";


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

              {/* nft list maped here */}
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
      </div>
    </div>
  );
}

