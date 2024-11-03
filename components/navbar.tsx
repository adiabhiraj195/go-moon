import React from 'react'
import WalletConnectButton from './ui/buttons/connect-button'
import Link from 'next/link'
import { Staatliches } from '@next/font/google'
import logo from './assets/full-moon-transparent-4.png'
import Image from 'next/image'

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})

export default function Navbar() {
    return (
        <div className='flex items-center justify-between py-2 px-3 w-full border-b border-gray-500' >
            <Link href={"/"} className='flex gap-2 items-center'>
                <Image src={logo} className='w-12' alt="logo" />
                <h1 className={`${statliche.className} text-2xl italic font-light`}>{`PUFF {MARKET}.com`}</h1>
            </Link>

            <div className='flex'>
                <Link href="/nft-assets" className='mx-2 hover:underline'>
                    my_assets
                </Link>
                <Link href="/create-new" className='mx-2 hover:underline'>
                    create_new
                </Link>
                <Link href="/nft/add" className='mx-2 hover:underline'>
                    add_one
                </Link>
                <Link href="/auction" className='mx-2 hover:underline'>
                    auctions
                </Link>
            </div>

            <div className='flex gap-4 items-center'>
                <WalletConnectButton />
            </div>
        </div>
    )
}
