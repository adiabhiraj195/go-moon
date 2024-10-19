import { cancelListing, updateListing } from "@/data-access/listing";
import { buyNftById, deleteNft, getNftById } from "@/data-access/nft";
import { createTransaction } from "@/data-access/transactions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const urlToArray = pathname.split("/");
    const id = urlToArray[urlToArray.length - 1];

    try {
        const response = await getNftById(id);
        return NextResponse.json(response);
    } catch (error) {
        console.error("Error verifying transaction:", error);
        return NextResponse.json({ success: false, error });
    }

}

// cancel listing 
export async function POST(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const urlToArray = pathname.split("/");
    const id = urlToArray[urlToArray.length - 1];
    const { account, txHash } = await req.json();

    try {
        const canclelisting = await cancelListing(id);

        const deletenft = await deleteNft(id);

        const tran = await createTransaction({
            userAddress: account,
            nftListingId: id,
            txHash: txHash,
            from: account,
            to: "marketplace",
            txType: "CANCELLED",
            amount: "0",

        });
        console.log(canclelisting, deletenft, tran)
        return NextResponse.json(tran);
    } catch (error) {
        console.error("Error cancelation", error);
        return NextResponse.json({ success: false, error });
    }

}

//buy nft
export async function PUT(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const urlToArray = pathname.split("/");
    const id = urlToArray[urlToArray.length - 1];
    const { account, txHash, price } = await req.json();

    try {
        const buylisting = await updateListing({
            id,
            userAddress: account,
            price,
            status: "SOLD"
        })
        console.log(buylisting);
        const buyNft = await buyNftById(id, account, "SOLD");
        console.log(buyNft);

        const tran = await createTransaction({
            nftListingId: id,
            userAddress: account,
            txHash: txHash,
            from: account,
            to: "marketplace",
            txType: "BUY",
            amount: price
        });

        console.log(tran);

        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })

    }
}