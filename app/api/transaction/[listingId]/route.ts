import { getListingTransaction } from "@/data-access/transactions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const urlToArray = pathname.split("/");
    const listingId = urlToArray[urlToArray.length - 1];

    try {
        const tran = await getListingTransaction(listingId)
        return NextResponse.json(tran);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })
    }
}