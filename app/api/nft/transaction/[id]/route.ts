import { getNftTransactions } from "@/data-access/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.url;
    const split = url.split("/");
    const id = split[split.length - 1];

    try {
        const transactions = await getNftTransactions(id);
        // console.log(transactions)
        return NextResponse.json({ success: true, transactions }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 400 })
    }
}