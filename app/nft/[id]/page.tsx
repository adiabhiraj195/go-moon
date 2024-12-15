"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";
import { Staatliches } from "@next/font/google";
import { NftInterface, NftMetadataInteface } from "@/types/nft-types";
import BuyButton from "@/components/ui/buttons/Buy-nft-button";
import Nft_Details_Panel from "@/components/nft-details-panel";
import Cancel_Listing_Button from "@/components/ui/buttons/cancel-listing-button";
import Nft_Transaction from "@/components/nft-transations";
import Image from "next/image";

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
        <div className="px-9 py-5">

            <div className="flex">
                <div className="w-2/5">
                    {/* image */}
                    <div className="border w-fit rounded-xl overflow-hidden border-gray-500 mb-5">
                        <Image
                            src={nft?.imageURI as string}
                            alt="Nft Asset"
                            width={1500}
                            height={1500}
                        />
                    </div>

                    {/* description  */}
                    <div className="w-full border rounded-xl border-gray3 mb-5 bg-gray1">
                        <div className="p-4 border-b border-gray3 font-bold">
                            Description
                        </div>
                        <p className="p-4 py-5 text-sm text-gray-300">
                            {metadata?.description}
                        </p>
                    </div>

                    {/* traits  */}
                    <div className="w-full border rounded-xl border-gray3 mb-5 bg-gray1">
                        <div className="p-4 border-b border-gray3 font-bold">
                            Traits
                        </div>
                        <div className="p-4 py-5 text-sm text-gray-300 flex flex-wrap justify-between">
                            {metadata?.traits.map((trait, index) => (
                                <div key={index} className="flex flex-col justify-center align-middle items-center bg-gray2 rounded-md p-3 w-36">
                                    <p className="text-gray-300 font-bold">{trait.key}</p>
                                    <p>{trait.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* details  */}
                    <div className="w-full border rounded-xl border-gray3 mb-5 bg-gray1">
                        <div className="p-4 border-b border-gray3 font-bold">
                            Details
                        </div>
                        <div className="p-4 py-5">
                            <div className="flex justify-between">
                                <span className="font-bold">Contract Address</span>
                                <span>{nft?.contractAddress.slice(0, 6)}...</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold">Token Id</span>
                                <span>{nft?.tokenId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold">Owner</span>
                                <span>{nft?.owner.address.slice(0, 6)}...</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold">Token Standard</span>
                                <span>ERC721</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-bold">Chain</span>
                                <span>Ethereum</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {/* listing header *** deal, share, more(refresh metadata, view website) */}
                    {/* title (name, tokenID, owner) */}
                    {/* sales details  */}
                    {/* price histery  */}
                    {/* listings  */}
                    {/* offers  */}

                </div>

            </div>

            <div>
                {/* item activity  */}
            </div>
            <div>
                {/* more from collection  */}
            </div>
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
                <Nft_Transaction nftId={id as string} />
            </div>
        </div>
    )
}
