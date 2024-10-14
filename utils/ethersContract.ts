import { apeWorldAbi } from "@/constants/ApeWorld";
import { ABI, CONTRACT_ADDRESS } from "@/constants/contractConfig";
import { ethers } from "ethers";


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