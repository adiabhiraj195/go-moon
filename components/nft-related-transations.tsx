"use client"
import React, { useEffect, useState } from 'react'

// import { getListingTransaction } from "@/data-access/transactions";

export default function NftRelatedTransations({ listingId }: { listingId: string }) {
    const [transactions, setTransactions] = useState([]);
    // const transactions = await getListingTransaction(listingId)
    // console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`/api/transaction/${listingId}`);
            const result = await data.json();
            setTransactions(result);
        }
        fetchData();
    }, [])
    return (<div>
        <h1>Transactions</h1>
        {transactions?.map((tran: any) => {
            return (
                <div className='bg-pink-600 m-2'>{tran.txType} | {tran.from} | {tran.txHash} | {tran.amount} | {tran.txHash}</div>
            )
        })}
    </div>)
}
