"use client"
import React from 'react'
import Image from "next/image";

//nft pics import
import nftImg1 from './assets/0574ece8a940682f8ba24bc26e474517.png'
import nftImg2 from './assets/17fbc86050a0fd9009f4e7b5f6a9d9a6.png'
import nftImg3 from './assets/1_KPsITt8mUz9hPtkSUCmgVg.jpg'
import nftImg4 from './assets/2021-09-10-image-18.webp'
import nftImg5 from './assets/61254c10-c4e2-11ec-b6eb-8947bb0d6d4e.cf.jpg'
import nftImg6 from './assets/FSgbZ3GXsAEZGE2.jpeg'
import nftImg7 from './assets/7046-Bored-Ape-NFT.png'
import nftImg8 from './assets/Mutant-857x900.jpeg'
import nftImg9 from './assets/ape2-768x773.jpg'
import nftImg10 from './assets/bored_ape_nft_accidental_.jpg'
import nftImg11 from './assets/boredape1.jpg'
import nftImg12 from './assets/mid_muzbenchape271550457.png'

import WalletConnectButton from '../components/ui/connect-button'
import { Staatliches, Afacad } from "@next/font/google";


const staat = Staatliches({
    weight: ['400'],
    subsets: ['latin']
})

const popins = Afacad({
    weight: ['400'],
    subsets: ['latin']
})
export default function LandingPage() {
    return (
        <div className="w-full h-full flex">
            <div className="discover flex flex-col justify-center items-center">
                <h1 className={`${staat.className} text-7xl `}>
                    DISCOVER,
                </h1>

                <h3 className={`${staat.className} text-2xl mb-2`}>Buy, Sell NFT's @Puff marketplace.</h3>

                <WalletConnectButton />
            </div>

            <div className="flex slide-outer rotate-6 w-2/4 justify-center overflow-hidden ">
                <div className="nft relative self-start h-4/5">
                    <div className="nft-slide flex flex-col">
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg1} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg2} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg3} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg4} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg5} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg6} alt="" />
                    </div>
                    <div className="nft-slide flex flex-col">
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg1} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg2} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg3} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg4} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg5} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg6} alt="" />
                    </div>
                </div>
                <div className="nft relative self-end h-4/5">
                    <div className="nft-slide flex flex-col">
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg7} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg8} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg9} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg10} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg11} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg12} alt="" />
                    </div>
                    <div className="nft-slide flex flex-col">
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg7} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg8} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg9} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg10} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg11} alt="" />
                        <Image className="w-48 h-56 rounded-xl m-2" src={nftImg12} alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}
