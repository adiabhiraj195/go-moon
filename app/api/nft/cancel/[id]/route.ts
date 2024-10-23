import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { updateListing } from "@/data-access/listing";
import { updateListingOfNft, updateNftOwner } from "@/data-access/nft";
import { createTransaction } from "@/data-access/transaction";

export async function POST(req: NextRequest) {
    const url = req.url
    const splitUrl = url.split("/")
    const nftId = splitUrl[splitUrl.length - 1]
    // console.log(nftId);
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ error: "unauthorised" }, { status: 401 })
    }
    //update listing to CANCELD
    //update nft's  islisted status to false

    try {
        await updateListing({ nftId, status: "CANCELED" })

        await updateListingOfNft(nftId, false,)

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
    }

}