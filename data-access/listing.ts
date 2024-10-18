import db from "@/utils/db";

export async function listNft(id: string, nftAddress: string, tokenId: string, price: string, userAddress: string, imageURl: string, name: string) {
    try {
        return await db.nftListing.create({
            data: {
                id,
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

export async function cancelListing(id: string) {
    try {
        return await db.nftListing.delete({
            where: {
                id
            }
        })
    } catch (error) {

    }
}