import React from 'react'
import WalletConnectButton from './ui/connect-button'
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
        <div className='flex items-center justify-between py-2 px-3 w-full' >
            <Link href={"/"} className='flex gap-2 items-center'>
                <Image src={logo} className='w-12' alt="logo" />
                <h1 className={`${statliche.className} text-2xl italic font-light`}>{`PUFF {MARKET}.com`}</h1>
            </Link>

            <div className='flex gap-4 items-center'>
                <div className='flex items-center justify-center w-28 btn-outer py-1'>
                    <Link href={"/nft/sell"} className={`${statliche.className} hover:bg-gradient-to-l hover:from-fuchsia-200 hover:to-sky-300 btn rounded-l text-2xl text-center w-36`}>
                        Sell NFT
                    </Link>
                </div>

                <WalletConnectButton />
            </div>


        </div>
    )
}
