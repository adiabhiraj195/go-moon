"use client"

import { redirect, useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/contexts/WalletProvide";
import { MarketContract } from "@/utils/ethersContract";
import Loading from "@/components/ui/Loading";
import { Staatliches } from "@next/font/google";
import NftRelatedTransations from "@/components/nft-related-transations";

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})

export default function NftPage() {
    const { tokenId, nftAddress } = useParams();
    const { signer, account, isConnected } = useWallet();
    const router = useRouter();

    const [nftDetails, setNftDetails] = useState<any>();
    const [cancelling, setCancelling] = useState<boolean>(false);
    const [buying, setBuying] = useState<boolean>(false);

    const id = (tokenId as string).concat(nftAddress as string);

    const cancleListing = async () => {
        if (!isConnected) return;

        const marketContract = MarketContract(signer);

        try {
            setCancelling(true);
            console.log("cancelling")
            const tx = await marketContract.cancelListing(nftAddress, tokenId);
            const wait = await tx.wait();
            const response = await fetch(`/api/nft/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    account: account,
                    txHash: wait.hash
                })
            })
            // console.log(response)
            // console.log(tx);

        } catch (error) {
            console.log(error)
        } finally {
            setCancelling(false);
            redirect("/");
        }
    }

    async function handleBuy() {
        if (!isConnected) return;
        setBuying(true);

        try {
            const marketContract = MarketContract(signer)
            const price = ethers.parseEther(nftDetails?.price)

            const tx = await marketContract.buyItem(nftAddress, tokenId, {
                value: price
            });
            const wait = tx.wait();

            const payload = {
                txHash: wait.hash,
                price,
                account
            }

            const response = await fetch(`/api/nft/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            console.log(response);
        } catch (error) {

        } finally {
            setBuying(false);
            router.refresh();
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/nft/${id}`);
            const result = await response.json();
            console.log(result)
            setNftDetails(result);
        };

        fetchData();
    }, [])


    return (
        <div>
            {cancelling && <Loading />}
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
                <p>
                    <strong>Trait type: </strong> {nftDetails?.traitType}
                </p>
                <button
                    onClick={cancleListing}
                    disabled={nftDetails?.userAddress.toLowerCase() !== account?.toLowerCase()}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    {cancelling ? "Canceling..." : "Cancle Listing"}
                </button>

                <button
                    onClick={handleBuy}
                    disabled={(nftDetails?.userAddress.toLowerCase() === account?.toLowerCase()) || !account}
                    className={`${statliche.className} hover:bg-gradient-to-l hover:from-fuchsia-200 hover:to-sky-300 btn rounded-l text-2xl text-center w-48`}
                >
                    {buying ? "Buying..." : "Buy Nft"}

                </button>
            </div>

            <div>
                <NftRelatedTransations listingId={id} />
            </div>
        </div>
    )
}
