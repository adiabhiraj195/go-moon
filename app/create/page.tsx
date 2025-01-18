import React from 'react'
import Link from 'next/link'
import FlottingBackButton from '@/components/ui/floting-back-button'

export default function Page() {
    return (
        <div className='w-full h-screen flex relative justify-center items-center'>
            <FlottingBackButton />
            <div className='w-1/2 h-full px-20'>
                <div className="min-h-screen text-white flex flex-col items-start justify-center">
                    <h1 className="text-4xl font-bold mb-8 text-left items-start">Create</h1>
                    <div className="space-y-4">
                        {/* Drop Option */}
                        <Link href={"/create/add"} className="flex items-center justify-between p-6 bg-gray1 rounded-lg shadow-md hover:bg-gray2 transition cursor-pointer">
                            <div>
                                <h2 className="text-xl font-semibold">Add to profile</h2>
                                <p className="text-gray-400 text-sm mt-2">
                                    Add your Nft to your puff profile for showcase, auctions, listing, etc. You can also share your nft to your social meadia accounts after adding to puff profile ; )
                                </p>
                            </div>
                            <span className="text-gray-500 text-2xl">&rarr;</span>
                        </Link>
                        {/* Collection or Item Option */}
                        <Link href={"/create/mint-nft"} className="flex items-center justify-between p-6 bg-gray1 rounded-lg shadow-md hover:bg-gray2 transition cursor-pointer">
                            <div>
                                <h2 className="text-xl font-semibold">Mint New Nft</h2>
                                <p className="text-gray-400 text-sm mt-2">
                                    Create a new NFT. Your items will display immediately. List for sale when you're ready.
                                </p>
                            </div>
                            <span className="text-gray-500 text-2xl">&rarr;</span>
                        </Link>
                    </div>
                    <p className="text-gray-500 text-sm mt-8">
                        Learn more <span className="text-blue-500 underline cursor-pointer">about each option</span>.
                    </p>
                </div>

            </div>
            {/* image */}
            <div className='w-1/2 h-full bg-cover bg-center'>
                {/* <Image src={"https://i.pinimg.com/550x/92/d2/f8/92d2f8d62dc9f0744c0dfef4ed8c012d.jpg"} alt='' className='w-full' width={100} height={100} /> */}
                <img src='https://i.pinimg.com/550x/92/d2/f8/92d2f8d62dc9f0744c0dfef4ed8c012d.jpg' alt='' className='w-full h-full' />
            </div>
        </div >
    )
}
