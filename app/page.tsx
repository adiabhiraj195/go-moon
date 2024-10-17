"use client"

// import GET_ACTIVE_ITEMS from "@/constants/subgraphQuerys";
// import { useQuery } from "@apollo/client";
// import { useWallet } from "@/contexts/WalletProvide";
// import Loading from "@/components/ui/Loading";
// import LandingPage from "@/app/Landing-page";
import NFTCard from "@/components/ui/NftBox";
import Link from "next/link";
import { Staatliches } from "@next/font/google";
import { useEffect, useState } from "react";

const staat = Staatliches({
  weight: ['400'],
  subsets: ['latin']
})

export default function Home() {

  // const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);
  // const { isConnected } = useWallet();
  const [nftListings, setNftListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/nft');
      const result = await response.json();
      console.log(result)
      setNftListings(result);
    };
    fetchData();
  }, [])

  return (
    <div className="flex w-full flex-col p-4">
      {/* {loading ? <Loading /> :
        <> */}
      <h1 className={`${staat.className} font-bold text-start text-3xl m-2`}>All NFTs ▼</h1>
      <div className="flex gap-4">

        {/* {listedNfts?.activeItems.map((item: { */}
        {nftListings?.map((item: {
          id: string
          nftAddress: string
          price: string
          userAddress: string
          tokenId: string
          imageURl: string
          name: string
        }) => {
          return (
            <Link href={`/nft/${item.nftAddress}/${item.tokenId}`} key={item.id}>
              <NFTCard
                name={item.name}
                imageUrl={item.imageURl}
                tokenId={item.tokenId}
                ownerAddress={item.userAddress}
                price={item.price}
              />
            </Link>
          )
        })
        }
      </div>
      {/* </>
      } */}
    </div>
  );
}
