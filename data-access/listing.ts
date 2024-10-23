import db from "@/utils/db";

export async function listNft({
    nftId,
    sellerId,
    price
}: {
    nftId: string;
    sellerId: string;
    price: string;
}) {
    try {
        return await db.listing.create({
            data: {
                nftId,
                sellerId,
                price
            }
        })
    } catch (error) {

    }
}

export async function getAllActiveListings() {
    try {
        return await db.listing.findMany({
            where: {
                status: "ACTIVE"
            },
            include: {
                nft: {
                    select: {
                        tokenId: true,
                        imageURI: true
                    }
                },
                seller: {
                    select: {
                        address: true
                    }
                }
            },
        })
    } catch (error) {

    }
}

export async function updateListing({
    nftId,
    status
}: {
    nftId: string
    status: "SOLD" | "CANCELED" | "ACTIVE"
}) {
    try {
        return await db.listing.update({
            where: {
                nftId
            },
            data: {
                status
            }
        })
    } catch (error) {

    }
}