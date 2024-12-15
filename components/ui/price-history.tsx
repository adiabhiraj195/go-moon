import React from "react";
import { AiOutlineClockCircle, AiOutlineLineChart } from "react-icons/ai";
import { IoIosArrowUp } from "react-icons/io";

const PriceHistory: React.FC = () => {
    return (
        <div className="bg-gray1 border border-gray3  text-white rounded-xl p-4 w-full max-w-4xl shadow-lg my-4">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <div className="flex items-center gap-2">
                    <AiOutlineLineChart size={20} />
                    <h2 className="text-lg font-semibold">Price History</h2>
                </div>
                <IoIosArrowUp size={20} className="cursor-pointer" />
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 mt-6">
                <AiOutlineClockCircle size={48} />
                <p className="font-semibold mt-2">No events have occurred yet</p>
                <p className="text-sm mt-1">Check back later.</p>
            </div>
        </div>
    );
};

export default PriceHistory;