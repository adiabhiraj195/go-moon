"use client"

import { useState } from "react";

interface NftDataInterface {
    name: string;
    supply: number;
    description: string;
    file: HTMLInputElement["files"] | null | any;
}
const CreateNFT = () => {
    const [nftData, setNftData] = useState<NftDataInterface>({
        name: '',
        supply: 1,
        description: '',
        file: null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNftData({ ...nftData, file: e.target.files });
        }
        console.log(nftData)
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNftData({ ...nftData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission, typically uploading the file and NFT data to the blockchain
        console.log(nftData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <form className="bg-gray-800 p-8 rounded-lg w-96 space-y-6" onSubmit={handleSubmit}>
                {/* File Upload Section */}
                <div className="border-dashed border-2 border-gray-600 rounded-lg p-6 flex flex-col items-center space-y-2">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                        accept="image/*,video/*"
                    />
                    {nftData.file == null ?
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <div className="text-center">Drag and drop media or <span className="text-blue-500">Browse files</span></div>
                            <div className="text-sm text-gray-500">Max size: 50MB (JPG, PNG, GIF, SVG, MP4)</div>
                        </label> :
                        <label htmlFor="fileInput" className="cursor-pointer">
                            {/* <div className="text-center">{nftData.file}</div> */}
                        </label>
                    }
                </div>

                {/* Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={nftData.name}
                        onChange={handleChange}
                        placeholder="Name your NFT"
                        className="w-full p-2 bg-gray-700 rounded-lg text-white"
                        required
                    />
                </div>

                {/* Supply */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Supply *</label>
                    <input
                        type="number"
                        name="supply"
                        value={nftData.supply}
                        onChange={handleChange}
                        min={1}
                        className="w-full p-2 bg-gray-700 rounded-lg text-white"
                        required
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={nftData.description}
                        onChange={handleChange}
                        placeholder="Enter a description"
                        className="w-full p-2 bg-gray-700 rounded-lg text-white"
                    />
                </div>

                {/* Create Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateNFT;