"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/contexts/WalletProvide";
import { useQuery } from "@apollo/client";
import GET_ACTIVE_ITEMS from "@/constants/subgraphQuerys";
import BuyButton from "@/components/ui/Buy-nft-button";
import { MarketContract, ApeWorldContract } from "@/utils/ethersContract";
import Loading from "@/components/ui/Loading";

export default function NftPage() {
    const { tokenId, nftAddress } = useParams();
    const id = (tokenId as string).concat(nftAddress as string);
    const [nftDetails, setNftDetails] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    // const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

    const { signer, account, isConnected } = useWallet();

    const cancleListing = async () => {
        const marketContract = MarketContract(signer);

        try {
            setLoading(true);
            console.log("cancelling")
            const tx = await marketContract.cancelListing(nftAddress, tokenId);

            const response = await fetch(`/api/nft/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    account: account,
                    txHash: tx.hash
                })
            })
            console.log(response)
            // console.log(tx);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(`/api/nft/${id}`);
            const result = await response.json();
            console.log(result)
            setNftDetails(result);
            // setNftListings(result);
            setLoading(false)
        };
        fetchData();
    }, [isConnected])

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <div>
                <img src={nftDetails?.image} alt=""></img>
            </div>

            <div>
                <p>
                    <strong>Name: </strong> {nftDetails?.name}
                </p>
                <p>
                    <strong>Description: </strong> {nftDetails?.description}
                </p>
                <p>
                    <strong>Price: </strong> {nftDetails?.price}
                </p>
                <p>
                    <strong>Owner: </strong> {nftDetails?.userAddress}
                </p>
                <button
                    onClick={cancleListing}
                    // disabled={ownerAddress?.toLowerCase() !== account?.toLowerCase()} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    cancle listing
                </button>
                {/* <BuyButton
                    nftPrice={price}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    ownerAddress={ownerAddress}
                /> */}
            </div>

        </div>
    )
}
