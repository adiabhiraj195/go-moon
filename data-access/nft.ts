import db from "@/lib/db";

interface NftInterface {
    tokenId: string;
    contractAddress: string;
    ownerId: string;
    metadataURI: string;
    imageURI: string;
}

export async function addNftToDatabase({
    tokenId,
    contractAddress,
    ownerId,
    metadataURI,
    imageURI
}: NftInterface) {
    try {

        return await db.nFT.create({
            data: {
                tokenId,
                contractAddress,
                ownerId,
                metadataURI,
                imageURI
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function getNftByAddressAndTokenId({ contractAddress, tokenId }: { contractAddress: string, tokenId: string }) {

    try {
        return await db.nFT.findMany({
            where: {
                contractAddress,
                tokenId,
            }
        })
    } catch (error) {

    }
}

export async function getAllNftOfUser(ownerId: string) {
    try {
        return await db.nFT.findMany({
            where: {
                ownerId
            }
        })
    } catch (error) {

    }
}
export async function getNftById(id: string) {
    try {
        return await db.nFT.findUnique({
            where: {
                id
            },
            include: {
                owner: true,
                listing: {
                    select: {
                        price: true
                    }
                }
            }

        })
    } catch (error) {

    }
}

export async function updateListingOfNft(id: string, isListed: boolean) {
    try {
        return await db.nFT.update({
            where: {
                id
            },
            data: {
                isListed: isListed
            }

        })
    } catch (error) {

    }
}
export async function updateNftOwner(id: string, isListed: boolean, ownerId: string) {
    try {
        return await db.nFT.update({
            where: {
                id
            },
            data: {
                isListed,
                ownerId
            }

        })
    } catch (error) {

    }
}
