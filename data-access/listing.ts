import db from "@/utils/db";

export async function listNft(nftAddress: string, tokenId: string, price: string, userAddress: string, imageURl: string, name: string) {
    try {
        return await db.nftListing.create({
            data: {
                userAddress,
                nftAddress,
                tokenId,
                price,
                status: "LISTED",
                imageURl,
                name
            }
        })
    } catch (error) {

    }
}

export async function getAllListing() {
    try {
        return await db.nftListing.findMany({ where: { status: "LISTED" } });
    } catch (error) {

    }
}