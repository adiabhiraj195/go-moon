import { NextRequest, NextResponse } from "next/server";
import { createUser, getUser } from "@/data-access/users";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { walletAddress } = data;

    try {
        const user = await getUser(walletAddress);

        if (!user) {
            const responce = await createUser(walletAddress);

            return NextResponse.json({ success: true, data: responce })
        }
        return NextResponse.json({ success: false, data: "allready registered" })
    } catch (error) {
        console.error("Error verifying transaction:", error);
        return NextResponse.json({ success: false, error });
    }

}