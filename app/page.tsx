"use client"

import GET_ACTIVE_ITEMS from "@/constants/subgraphQuerys";
import { useQuery } from "@apollo/client";
import NFTCard from "@/components/ui/NftBox";
import Link from "next/link";
import { useWallet } from "@/contexts/WalletProvide";
import Loading from "@/components/ui/Loading";
import { Staatliches } from "@next/font/google";
import LandingPage from "@/app/Landing-page";

const staat = Staatliches({
  weight: ['400'],
  subsets: ['latin']
})

export default function Home() {

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);
  const { isConnected } = useWallet();

  // console.log(listedNfts);
  if (!isConnected) {
    return (
      <LandingPage />
    )
  }
  return (
    <div className="flex w-full flex-col p-4">
      {loading ? <Loading /> :
        <>
          <h1 className={`${staat.className} font-bold text-start text-3xl m-2`}>All NFTs ▼</h1>
          <div className="flex gap-4">

            {listedNfts?.activeItems.map((item: {
              buyer: string
              id: string
              nftAddress: string
              price: string
              seller: string
              tokenId: string
            }) => {
              return (
                <Link href={`/nft/${item.id}`} key={item.id}>
                  <NFTCard
                    tokenId={item.tokenId}
                    ownerAddress={item.seller}
                    nftAddress={item.nftAddress}
                    price={item.price}
                  />
                </Link>
              )
            })
            }
          </div>
        </>
      }
    </div>
  );
}
