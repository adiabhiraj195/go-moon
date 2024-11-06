import { apeWorldAbi } from "@/constants/ApeWorld";
import { ABI, CONTRACT_ADDRESS } from "@/constants/contractConfig";
import { ethers } from "ethers";
import { PUFF_NFT_ABI, PUFF_NFT_ADDRESS } from "@/constants/PuffNft";

export function MarketContract(signer: ethers.Signer | null) {

    return new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        signer
    )
}

export function ApeWorldContract(nftAddress: string, signer: ethers.Signer | null) {
    return new ethers.Contract(
        nftAddress,
        apeWorldAbi,
        signer
    )
}

export function NftContract(signer: ethers.Signer | null) {
    return new ethers.Contract(PUFF_NFT_ADDRESS, PUFF_NFT_ABI, signer)
}