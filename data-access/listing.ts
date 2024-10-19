import db from "@/utils/db";

interface ListingInterface {
    id: string,
    nftAddress: string,
    tokenId: string,
    price: string,
    userAddress: string,
    imageUrl: string,
    name: string
}
interface UpdateListingInterface {
    id: string,
    price?: string,
    userAddress?: string,
    status?: "LISTED" | "SOLD" | "CANCELLED"
}

export async function createListing({
    id,
    nftAddress,
    tokenId,
    price,
    userAddress,
    imageUrl,
    name
}:
    ListingInterface) {
    try {
        return await db.nftListing.create({
            data: {
                id,
                userAddress: userAddress,
                nftAddress: nftAddress as string,
                tokenId: tokenId as string,
                price: price as string,
                status: "LISTED",
                imageURl: imageUrl as string,
                name: name as string
            }
        })
    } catch (error) {

    }
}

export async function updateListing({
    id,
    price,
    userAddress,
    status
}: UpdateListingInterface) {
    try {
        return await db.nftListing.update({
            where: {
                id
            },
            data: {
                userAddress: userAddress,
                price: price,
                status: status,
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
export async function getListing(id: string) {
    try {
        return await db.nftListing.findUnique({ where: { id } });
    } catch (error) {

    }
}

export async function cancelListing(id: string) {
    try {
        return await db.nftListing.update({
            where: {
                id
            },
            data: {
                status: "CANCELLED"
            }
        })
    } catch (error) {

    }
}