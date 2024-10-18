import { NextRequest, NextResponse, userAgent } from "next/server";
import { getUser } from "@/data-access/users";
import { getAllListing, listNft } from "@/data-access/listing";
import { createTransaction } from "@/data-access/transactions";
import { pushNftDetails } from "@/data-access/nft";

export async function POST(req: NextRequest, res: NextResponse) {
    const { nftAddress, tokenId, price, account, txHash, uri } = await req.json();

    try {
        const user = await getUser(account);
        if (!user) {
            return NextResponse.json({ success: false, msg: "no user exist" });
        }

        const URI = JSON.parse(uri);
        const id = (tokenId as string).concat(nftAddress as string);

        const listResponce = await listNft(id, nftAddress, tokenId, price, account, URI?.image, URI?.name);
        console.log(listResponce);

        const tran = await createTransaction({
            userAddress: account,
            nftListingId: listResponce?.id || "-1",
            txHash: txHash,
            from: account,
            to: "marketplace",
            txType: "LIST",
            amount: "0",

        });
        console.log(tran)

        const details = await pushNftDetails({
            id,
            userAddress: account,
            name: URI?.name,
            description: URI?.description,
            traitType: URI?.attributes[0].trait_type,
            price,
            image: URI?.image,
            status: "LISTED"
        })
        console.log(details)
        //updatre nft details
        return NextResponse.json({ success: true, msg: "created" })
    } catch (error) {
        console.error("Error verifying transaction:", error);
        return NextResponse.json({ success: false, error });
    }

}
export async function GET() {

    try {
        const response = await getAllListing();
        return NextResponse.json(response)
    } catch (error) {
        console.error("Error verifying transaction:", error);
        return NextResponse.json({ success: false, error });
    }

}