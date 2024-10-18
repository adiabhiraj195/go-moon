import db from "@/utils/db";

interface transactionInterface {
    userAddress: string,
    nftListingId: string,
    txType: "LIST" | "CANCELLED" | "MINT" | "BUY",
    from: string,
    to: string,
    txHash: string,
    amount?: string,
}
export async function createTransaction({
    userAddress, nftListingId, txHash, from, to, txType, amount
}: transactionInterface) {
    try {
        return await db.transaction.create({
            data: {
                userAddress,
                nftListingId,
                txHash,
                from,
                to,
                amount,
                txType
            }
        })
    } catch (error) {

    }
}

// userAddress     String // Foreign key to User model
//   nftListing      NftListing?     @relation(fields: [nftListingId], references: [id])
//   nftListingId    Int? // Foreign key to NftListing model
//   txHash          String          @unique
//   amount          String
//   transactionType TransactionType // Enum to represent 'buy', 'withdraw', 'mint', 'list'
//   createdAt 