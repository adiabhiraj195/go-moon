import db from "@/utils/db";

interface nftInterface {
    id: string,
    userAddress: string,
    name: string,
    description: string,
    traitType: string,
    price: string,
    image: string,
    status: "LISTED" | "SOLD" | "CANCELLED",
}

export async function pushNftDetails({
    id,
    userAddress,
    name,
    description,
    traitType,
    price,
    image,
    status
}: nftInterface) {
    try {
        return await db.nftDetails.create({
            data: {
                id,
                userAddress,
                name,
                description,
                traitType,
                price,
                image,
                status
            }
        })
    } catch (error) {

    }
}

export async function getNftById(id: string) {
    try {
        return await db.nftDetails.findUnique({
            where: {
                id
            }
        })
    } catch (error) {

    }
}
export async function deleteNft(id: string) {
    try {
        return await db.nftDetails.delete({
            where: {
                id
            }
        })
    } catch (error) {

    }
}
