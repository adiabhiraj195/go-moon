import { getNftById } from "@/data-access/nft";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.url;
    const split = url.split("/");
    const id = split[split.length - 1];

    try {
        const nft = await getNftById(id);

        if (!nft) {
            return NextResponse.json({ success: false, error: "No nft with such id" }, { status: 404 })
        }

        return NextResponse.json({ success: true, nft }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 400 })
    }
}