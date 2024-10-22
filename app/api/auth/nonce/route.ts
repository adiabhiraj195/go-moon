import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const nonce = Math.floor(Math.random() * 1000000).toString(); // Generate a random nonce
    return NextResponse.json({ nonce });
}