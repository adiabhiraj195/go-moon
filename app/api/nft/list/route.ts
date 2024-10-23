import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { listNft } from "@/data-access/listing";
import { updateListingOfNft } from "@/data-access/nft";

export async function POST(req: NextRequest) {
    const { nftId, price } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
        return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    }

    try {
        const listing = await listNft({
            nftId,
            sellerId: session?.user.id as string,
            price
        })
        await updateListingOfNft(nftId, true)

        return NextResponse.json({ success: true, listing }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: error }, { status: 401 })
    }
}