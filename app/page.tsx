"use client"
// import { ethers } from "ethers";
// import { CONTRACT_ADDRESS, ABI } from "@/constants/contractConfig";
// import { nftAbi } from "@/constants/BaseNft";
// import { useWallet } from "@/contexts/WalletProvide";
import GET_ACTIVE_ITEMS from "@/constants/subgraphQuerys";
import { useQuery } from "@apollo/client";
import NFTCard from "@/components/ui/NftBox";

export default function Home() {

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);
  // console.log(listedNfts);

  return (
    <div className="">
      <h1 className="font-bold text-purple-300 bg-yellow-500">hellow</h1>
      {listedNfts?.activeItems.map((item: {
        buyer: string
        id: string
        nftAddress: string
        price: string
        seller: string
        tokenId: string
      }) => {
        return (
          <NFTCard
            key={item.id}
            tokenId={item.tokenId}
            ownerAddress={item.seller}
            name={"item name"}
            nftAddress={item.nftAddress}
            price={item.price}
          />
        )
      })
      }
    </div>
  );
}
