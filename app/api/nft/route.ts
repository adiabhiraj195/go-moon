import { NextRequest, NextResponse, userAgent } from "next/server";
import { getUser } from "@/data-access/users";
import { getAllListing, createListing, getListing, updateListing } from "@/data-access/listing";
import { createTransaction } from "@/data-access/transactions";
import { pushNftDetails } from "@/data-access/nft";

// const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

//list nft
export async function POST(req: NextRequest, res: NextResponse) {
    const { nftAddress, tokenId, price, account, txHash, uri } = await req.json();
    const id = (tokenId as string).concat(nftAddress as string);

    try {
        const user = await getUser(account);
        if (!user) {
            return NextResponse.json({ success: false, msg: "no user exist" });
        }

        const URI = JSON.parse(uri);
        const nftExists = await getListing(id);

        let listResponce;
        if (nftExists) {
            listResponce = await updateListing({
                id,
                price,
                userAddress: account,
                status: "LISTED"
            })
            console.log(listResponce)
        } else {
            listResponce = await createListing({
                id: id,
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
                userAddress: account,
                imageUrl: URI?.image,
                name: URI?.name
            });
            console.log(listResponce);
        }

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