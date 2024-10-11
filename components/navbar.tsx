import React from 'react'
import WalletConnectButton from './ui/connect-button'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className='flex justify-between py-2 px-5'>
            <div>app-name</div>

            <div className='flex items-center'>
                <Link href={"/nft/sell"} className='border rounded-xl border-gray-500 px-3 py-2'>
                    Sell NFT
                </Link>

                <WalletConnectButton />
            </div>

        </div>
    )
}
