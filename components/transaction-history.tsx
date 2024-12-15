import React from 'react';

type ItemActivity = {
    event: string;
    price: string;
    from: string;
    to?: string;
    date: string;
};

const activityData: ItemActivity[] = [
    { event: 'Sale', price: '0.054 ETH', from: 'BFC2AA', to: '003200', date: '31m ago' },
    { event: 'List', price: '0.054 ETH', from: 'BFC2AA', date: '33m ago' },
    { event: 'List', price: '0.081 ETH', from: 'BFC2AA', date: '10h ago' },
    { event: 'List', price: '0.140 ETH', from: 'BFC2AA', date: '13h ago' },
    { event: 'Mint', price: '0.0661 ETH', from: 'NullAddress', to: 'BFC2AA', date: '13h ago' },
];

const TransactionHistory = () => {
    return (
        <div className="bg-gray1 border border-gray3 text-white p-4 rounded-xl w-full">
            <h2 className="text-lg font-semibold mb-4">Item Activity</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse text-sm">
                    <thead>
                        <tr className="text-left border-b border-gray-700">
                            <th className="px-4 py-2">Event</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">From</th>
                            <th className="px-4 py-2">To</th>
                            <th className="px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activityData.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-800 hover:bg-gray-800 transition-all"
                            >
                                <td className="px-4 py-2 flex items-center gap-2">
                                    {item.event === 'Sale' ? '🛒' : item.event === 'List' ? '🏷️' : '✨'}
                                    {item.event}
                                </td>
                                <td className="px-4 py-2">{item.price}</td>
                                <td className="px-4 py-2 text-blue-400 cursor-pointer">{item.from}</td>
                                <td className="px-4 py-2 text-blue-400 cursor-pointer">
                                    {item.to || '--'}
                                </td>
                                <td className="px-4 py-2">{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;
