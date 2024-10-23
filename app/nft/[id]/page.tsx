"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";
import { Staatliches } from "@next/font/google";
import { NftInterface, NftMetadataInteface } from "@/types/nft-types";
import BuyButton from "@/components/ui/buttons/Buy-nft-button";
import Nft_Details_Panel from "@/components/nft-details-panel";
import Cancel_Listing_Button from "@/components/ui/buttons/cancel-listing-button";

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})

export default function NftPage() {
    const { id } = useParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [nft, setNft] = useState<NftInterface | null>(null);
    const [metadata, setMetadata] = useState<NftMetadataInteface | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/nft/${id}`);
                const result = await response.json();
                console.log(result)
                if (result.success) {
                    setNft(result.nft);

                    const metadata = await fetch(result.nft.metadataURI);
                    setMetadata(await metadata.json())
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    return (
        <div>
            {loading && <Loading />}

            <Nft_Details_Panel nft={nft} metadata={metadata} />

            <div>
                <Cancel_Listing_Button
                    nftId={id as string}
                    nftAddress={nft?.contractAddress as string}
                    tokenId={nft?.tokenId as string}
                />

                <BuyButton
                    nftId={id as string}
                    nftAddress={nft?.contractAddress as string}
                    tokenId={nft?.tokenId as string}
                    nftPrice={nft?.listing?.price as string}
                    ownerId={nft?.ownerId as string}
                />

            </div>

            <div>
                {/* <NftRelatedTransations listingId={id} /> */}
            </div>
        </div>
    )
}
