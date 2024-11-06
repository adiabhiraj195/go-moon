import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { addNftToDatabase, getNftByAddressAndTokenId } from "@/data-access/nft";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { tokenId, contractAddress, metadataURI, imageURI } = await req.json();

    if (!session || !session?.user) {
        return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    }
    const id = session.user.id;
    try {
        const isexists = await getNftByAddressAndTokenId({ contractAddress, tokenId })
        console.log(isexists)
        if (isexists?.length == 0) {
            const response = await addNftToDatabase({
                tokenId,
                contractAddress,
                metadataURI,
                imageURI,
                ownerId: id as string
            })
            return NextResponse.json({ data: response }, { status: 200 });
        }

        return NextResponse.json({ sucess: false, error: "allready added" }, { status: 400 })

    } catch (e) {
        return NextResponse.json({ success: false, error: e }, { status: 401 })
    }
}