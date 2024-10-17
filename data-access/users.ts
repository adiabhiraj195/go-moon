import db from "@/utils/db";

export async function createUser(walletAddress: string) {
    try {
        return await db.user.create({
            data: {
                walletAddress
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getUser(walletAddress: string) {
    try {
        return await db.user.findUnique({
            where: {
                walletAddress
            }
        });
    } catch (error) {
        console.log(error);
    }
}