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
    return (
        <div>
            <h1>Transactions</h1>
            <table>

                <thead>
                    <tr>

                        <th>Type</th>
                        <th>From</th>
                        <th>TxHash</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions?.map((tran: any) => {
                        return (

                            <tr className='bg-pink-600 m-2' key={tran.id}>
                                <td>{tran.txType}| </td>
                                <td> {tran.from}| </td>
                                <td>{tran.txHash}| </td>
                                <td>{tran.amount}| </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div>
    )
}
