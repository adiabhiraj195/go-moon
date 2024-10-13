"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/contexts/WalletProvide";
import { useQuery } from "@apollo/client";
import GET_ACTIVE_ITEMS from "@/constants/subgraphQuerys";
import BuyButton from "@/components/ui/Buy-nft-button";
import { MarketContract, ApeWorldContract } from "@/utils/ethersContract";

export default function NftPage() {
    const { id } = useParams();
    const [image, setImage] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [ownerAddress, setOwnerAddress] = useState<string>("");

    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

    const { signer, account } = useWallet();

    const nftAddress = (id.slice(1) as string).trim();
    const tokenId = (id.slice(0, 1) as string).trim();

    const getTokenUri = async (tokenId: string) => {

        const nftContract = ApeWorldContract(nftAddress, signer);

        const tx = await nftContract.tokenURI(tokenId);
        return tx
    }

    async function updateUI() {
        const result = await getTokenUri(tokenId);
        const data = JSON.parse(result);

        if (data) {
            console.log(data)
            setImage(data.image);
            setName(data.name);
            setDescription(data.description);
        }
        const otherData = listedNfts?.activeItems.filter((item: any) => {
            return item.id === id;
        })

        if (otherData.length > 0) {
            setPrice(ethers.formatEther(otherData[0].price));
            setOwnerAddress(otherData.seller)
        }
    }

    const cancleListing = async () => {

        const marketContract = MarketContract(signer);

        const tx = await marketContract.cancelListing(nftAddress, tokenId);

        console.log(tx);
    }

    useEffect(() => {
        updateUI();
    }, [])

    return (
        <div>
            <div>
                <img src={image} alt=""></img>
            </div>

            <div>
                <p>
                    <strong>Name: </strong> {name}
                </p>
                <p>
                    <strong>Description: </strong> {description}
                </p>
                <p>
                    <strong>Price: </strong> {price}
                </p>
                <button
                    onClick={cancleListing}
                    disabled={ownerAddress?.toLowerCase() !== account?.toLowerCase()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    cancle listing
                </button>
                <BuyButton
                    nftPrice={price}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    ownerAddress={ownerAddress}
                />
            </div>

        </div>
    )
}
