import React from "react";
import { FaHandshake } from "react-icons/fa"; // For handshake icon
import { FiShare2 } from "react-icons/fi"; // For share icon
import { HiDotsHorizontal } from "react-icons/hi"; // For three dots

const ListingHeader = ({
    name,
    tokenId,
    owner
}: {
    name: string
    tokenId: string
    owner: string
}) => {
    return (
        <div className=" text-white p-6 flex w-full justify-between">
            <div className="mt-2">
                <h1 className="text-3xl font-bold">{name} #{tokenId}</h1>
                <p className="text-sm text-gray-400">
                    Owned by{" "}
                    <span className="text-blue-400 cursor-pointer hover:underline">
                        {owner?.slice(0, 4)}...{owner?.slice(-4)}
                    </span>
                </p>
            </div>

            <div className="flex gap-4 items-center">
                <FaHandshake className="text-white cursor-pointer" size={20} />
                <FiShare2 className="text-white cursor-pointer" size={20} />
                <HiDotsHorizontal className="text-white cursor-pointer" size={20} />
            </div>
        </div>
    );
};

export default ListingHeader;