import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { updateListing } from "@/data-access/listing";
import { updateNftOwner } from "@/data-access/nft";
import { createSaleHistory, createTransaction } from "@/data-access/transaction";

export async function POST(req: NextRequest) {
    const { sellerId, txHash, price } = await req.json()
    const url = req.url
    const splitUrl = url.split("/")
    const nftId = splitUrl[splitUrl.length - 1]
    console.log(nftId);
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ error: "unauthorised" }, { status: 401 })
    }
    //update listing to SOLD
    //update nft's owner id and is listed status to false
    //update sale history and transaction

    try {
        await updateListing({ nftId, status: "SOLD" })

        await updateNftOwner(nftId, false, session?.user.id as string)

        await createTransaction({
            nftId,
            sellerId,
            buyerId: session?.user.id as string,
            price,
            transactionHash: txHash
        })
        await createSaleHistory({
            nftId,
            sellerId,
            buyerId: session?.user.id as string,
            price,
            transactionHash: txHash
        })

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
    }

}