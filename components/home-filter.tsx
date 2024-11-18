"use client"

import Link from "next/link";
import React, { useState } from "react";

const HomeFilter = () => {
    const [selectedTab, setSelectedTab] = useState("Trending");
    const [selectedTime, setSelectedTime] = useState("24h");

    return (
        <div className="flex items-center justify-between bg-black text-white py-4">
            {/* Left Tabs */}
            <div className="flex space-x-2">
                {["Trending", "Top"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-4 py-2 rounded-md ${selectedTab === tab
                            ? "bg-gray3 text-white"
                            : " text-gray-400 hover:bg-gray2"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Right Filters */}
            <div className="flex items-center space-x-2">
                {["1h", "6h", "24h", "7d"].map((time) => (
                    <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded-md ${selectedTime === time
                            ? "bg-gray3 text-white"
                            : " text-gray-400 hover:bg-gray2"
                            }`}
                    >
                        {time}
                    </button>
                ))}

                {/* Dropdown */}
                <div className="relative">
                    <button className="px-4 py-2 rounded-md text-gray-400 hover:bg-gray2">
                        All chains <span className="ml-1">▼</span>
                    </button>
                    {/* Dropdown Menu */}
                    {/* Uncomment and populate if you want dropdown options */}
                    {/* <div className="absolute mt-2 w-40 bg-gray-900 text-white rounded-md shadow-lg">
            <button className="block px-4 py-2 hover:bg-gray-700">Option 1</button>
            <button className="block px-4 py-2 hover:bg-gray-700">Option 2</button>
          </div> */}
                </div>

                <Link href={"/nft"} className="px-4 py-2 rounded-md text-gray-400 hover:bg-gray2">
                    View all
                </Link>
            </div>
        </div>
    );
};

export default HomeFilter;