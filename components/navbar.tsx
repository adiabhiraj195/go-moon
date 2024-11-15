import React from 'react'
import WalletConnectButton from './ui/buttons/connect-button'
import Link from 'next/link'
import { Staatliches } from '@next/font/google'
import logo from './assets/full-moon-transparent-4.png'
import Image from 'next/image'
import SearchBar from './ui/search-bar'

const statliche = Staatliches({
    weight: ["400"],
    subsets: ['latin']
})

export default function Navbar() {
    return (
        <div className='flex items-center justify-between py-2 px-3 w-full border-b border-gray-500' >
            <div className='flex items-center'>

                <Link href={"/"} className='flex gap-2 items-center mr-4'>
                    <Image src={logo} className='w-12' alt="logo" />
                    <h1 className={`${statliche.className} text-2xl italic font-light border-r pr-3 border-gray-500 `}>{`PUFF {MARKET}`}</h1>
                </Link>

                <Link href="/create-new" className='mx-3 font-bold hover:text-gray-400'>
                    Create
                </Link>
                <Link href="/nft/add" className='mx-3 font-bold hover:text-gray-400'>
                    Add_Nft
                </Link>
                <Link href="/auction" className='mx-3 font-bold hover:text-gray-400'>
                    Auctions
                </Link>
            </div>

            <SearchBar />

            <div className='flex gap-4 items-center'>
                <WalletConnectButton />

                <Link href={"/account"} className='bg-gray1 p-3 rounded-md hover:bg-gray3'>
                    <div className={`bg-blue-600 rounded-full p-3`}></div>
                </Link>
            </div>
        </div>
    )
}
