import { NextRequest, NextResponse, userAgent } from "next/server";
import { getUser } from "@/data-access/users";
import { getAllListing, listNft } from "@/data-access/listing";
import { createTransaction } from "@/data-access/transactions";

export async function POST(req: NextRequest, res: NextResponse) {
    const { nftAddress, tokenId, price, account, txHash, uri } = await req.json();
    // console.log(process.env.INFURA_API_URL)
    // const provider = new ethers.JsonRpcProvider(process.env.INFURA_API_URL)
    // const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
    // console.log(provider, " -> Provider")
    // console.log(signer, " -> Signer")


    // const nftContract = ApeWorldContract(nftAddress as string, signer);
    try {
        const user = await getUser(account);
        if (!user) {
            return NextResponse.json({ success: false, msg: "no user exist" });
        }

        const URI = JSON.parse(uri);

        const listResponce = await listNft(nftAddress, tokenId, price, account, URI?.image, URI?.name);
        console.log(listResponce);

        const tran = await createTransaction({
            userAddress: account,
            nftListingId: listResponce?.id || -1,
            txHash: txHash,
            from: account,
            to: "marketplace",
            txType: "LIST",
            amount: "0",

        });
        console.log(tran)
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