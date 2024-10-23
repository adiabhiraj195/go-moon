import db from "@/utils/db"

export async function createTransaction({
    nftId,
    sellerId,
    buyerId,
    price,
    transactionHash
}: {
    nftId: string
    sellerId: string
    buyerId: string
    price: string
    transactionHash: string
}) {
    try {
        return await db.transaction.create({
            data: {
                nftId,
                sellerId,
                buyerId,
                price,
                transactionHash
            }
        })
    } catch (error) {

    }
}