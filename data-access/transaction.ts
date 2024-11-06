import db from "@/lib/db"

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
export async function createSaleHistory({
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
        return await db.saleHistory.create({
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

export async function getNftTransactions(nftId: string) {
    try {
        return await db.transaction.findMany({
            where: {
                nftId
            },
            include: {
                seller: {
                    select: {
                        address: true
                    }
                },
                buyer: {
                    select: {
                        address: true
                    }
                }

            }
        })
    } catch (error) {

    }
}