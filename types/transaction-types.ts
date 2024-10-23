export interface TransactionInterface {
    nftId: string;
    id: string;
    buyerId: string;
    sellerId: string;
    price: string;
    transactionHash: string;
    createdAt: Date;
    buyer: { address: string };
    seller: { address: string };
}