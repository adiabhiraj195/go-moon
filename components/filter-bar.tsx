"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import Slider from 'react-slick';

const FilterBar = ({ nftItems }: { nftItems: any }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('All');

    const filters = ['All', 'Art', 'Gaming', 'Memberships', 'PFPs', 'Photography', 'Music'];

    return (
        <div className='w-full'>
            <div className="flex space-x-4 bg-black p-4 rounded-lg">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-4 py-2 hover:bg-gray3 rounded-md text-white ${selectedFilter === filter
                            ? 'bg-gray3 font-semibold'
                            : 'bg-transparent text-gray-400 hover:text-white'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <NftCarousel nftItems={nftItems} />
        </div>
    );
};

export default FilterBar;

const NftCarousel = ({ nftItems }: { nftItems: any }) => {
    const settings = {
        infinite: true,
        speed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        pauseOnHover: true,
        arrows: false, // Enable or disable the arrows
    };

    return (
        <Slider {...settings}>
            {nftItems?.map((nft: any, index: number) => (
                <Link href={`/nft/${nft.nftId}`} key={index} className='p-2 hover:border-2 rounded-lg hover:border-blue-500 overflow-hidden'>
                    <div className=" bg-cover bg-center overflow-hidden text-white relative h-80 ">
                        <img
                            src={nft.nft.imageURI}
                            alt={nft.nft.tokenId}
                            className="object-cover h-full w-full"
                        />
                        <div className="p-3 flex absolute bottom-0 w-full bg-transparent justify-between">
                            <p className="text-md font-bold">#{nft.nft.tokenId}</p>
                            <p className="text-md font-bold">
                                {nft.price} ETH
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </Slider>
    );
};
