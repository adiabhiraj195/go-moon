"use client"

import { useParams } from "next/navigation"
import { SetStateAction, useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";
import { Staatliches } from "@next/font/google";
// import NftRelatedTransations from "@/components/nft-related-transations";
import { NftInterface, NftMetadataInteface } from "@/types/nft-types";
import List_Nft_Popup from "@/components/list-nft-popup";
import BuyButton from "@/components/ui/buttons/buy-nft-button";

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})

export default function NftPage() {
    const { id } = useParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [nft, setNft] = useState<NftInterface | null>(null);
    const [metadata, setMetadata] = useState<NftMetadataInteface | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);

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
            {isOpen && <List_Nft_Popup
                setIsOpen={setIsOpen}
                nftId={id as string}
                nftContract={nft?.contractAddress as string}
                tokenId={nft?.tokenId as string}
            />}

            <div>
                <img src={nft?.imageURI} alt=""></img>
            </div>

            <div>
                <p>
                    <strong>Name: </strong> {metadata?.name}
                </p>
                <p>
                    <strong>Description: </strong> {metadata?.description}
                </p>
                {nft?.isListed ?
                    <p>
                        <strong>Price: </strong> {nft.listing?.price}
                    </p> :
                    "Not listed yet"
                }
                <p>
                    <strong>Contract address: </strong> {nft?.contractAddress}
                </p>
                <p>
                    <strong>Owner: </strong> {nft?.owner.address}
                </p>
                <p>
                    <strong>Contract address: </strong> {nft?.contractAddress}
                </p>
                <div>
                    <strong>Trait type: </strong>
                    <ol>
                        {metadata?.attributes.map((attribute) => {
                            return (
                                <li key={attribute.trait_type}>
                                    {attribute.trait_type}: {attribute.value}
                                </li>
                            )
                        })}
                    </ol>
                </div>

                <div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={nft?.isListed}
                        onClick={openModal}
                    >
                        {nft?.isListed ? "allready listed" : " List NFT"}
                    </button>

                    <BuyButton
                        nftId={id as string}
                        nftAddress={nft?.contractAddress as string}
                        tokenId={nft?.tokenId as string}
                        nftPrice={nft?.listing?.price as string}
                        ownerId={nft?.ownerId as string}
                    />
                </div>

            </div>

            <div>
                {/* <NftRelatedTransations listingId={id} /> */}
            </div>
        </div>
    )
}
