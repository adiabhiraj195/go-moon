"use client"

import { useState } from "react";
import { uploadImageToPinata, uploadMetadataToPinata } from "@/utils/pinata";
import { NftContract } from "@/utils/ethersContract";
import { useWallet } from "@/contexts/WalletProvide";
import Loading from "@/components/ui/Loading";

interface NftDataInterface {
    name: string;
    supply: number;
    description: string;
    file: HTMLInputElement["files"] | null | any;
    externalLink: string;
    traits: { key: string, value: string }[];
    author: string;
}
const CreateNFT = () => {
    const [nftData, setNftData] = useState<NftDataInterface>({
        name: '',
        supply: 1,
        description: '',
        file: null,
        externalLink: '',
        traits: [{ key: '', value: '' }],
        author: ''
    });
    const [loading, setLoading] = useState(false);

    const { signer, account } = useWallet();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNftData({ ...nftData, file: e.target.files[0] });
            console.log(nftData)
        }
    };
    // useEffect(() => {
    //     console.log(uploadImageToPinata(nftData?.file));
    // }, [nftData])
    console.log(nftData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNftData({ ...nftData, [e.target.name]: e.target.value });
    };

    const handleTraitChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedTraits = nftData.traits.map((trait, i) =>
            i === index ? { ...trait, [e.target.name]: e.target.value } : trait
        );
        setNftData({ ...nftData, traits: updatedTraits });
    };

    const handleAddTrait = () => {
        setNftData({ ...nftData, traits: [...nftData.traits, { key: '', value: '' }] });
    };

    const handleRemoveTrait = (index: number) => {
        const updatedTraits = nftData.traits.filter((_, i) => i !== index);
        setNftData({ ...nftData, traits: updatedTraits });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signer || !account) {
            return alert("Re-connect! your wallet");
        }

        if (nftData.file === null) {
            return alert("Image is not uploaded");
        }
        console.log("start")

        setLoading(true);
        try {
            console.log("checkpoint-1")
            // uploading image to pinata
            const imageResponse = await uploadImageToPinata(nftData.file);
            const imageURI = "https://sapphire-keen-aardvark-438.mypinata.cloud/ipfs/".concat(imageResponse?.IpfsHash as string);

            // upload metadata to pinata
            const metadataHash = await uploadMetadataToPinata({
                name: nftData.name,
                image: imageURI,
                description: nftData.description,
                externalLink: nftData.externalLink,
                traits: nftData.traits,
                author: nftData.author

            })

            //mint nft
            const metadataURI = "https://sapphire-keen-aardvark-438.mypinata.cloud/ipfs/".concat(metadataHash?.IpfsHash as string);
            const contract = NftContract(signer);

            const tx = await contract.mintNFT(account, metadataURI);
            tx.wait();

            setLoading(false);
            alert(`nft is minted to ${account}`);
            console.log("checkpoint-3")

            // add nft to assets


        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        // console.log(nftData);
    };

    return (
        <div className="items-center text-white w-full px-5">
            {loading && <Loading />}
            <h1 className="text-3xl font-bold my-3 mt-6">Create an NFT</h1>
            <p className="font-light">Once your item is minted you will not be able to change any of its information.</p>
            <form
                className="flex justify-between w-full m-3 mt-6"
                onSubmit={handleSubmit}
            >
                {/* File Upload Section */}
                <div className="border-dashed border-2 border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center w-2/5">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                        accept="image/*,video/*"
                    // accept="image"
                    />
                    {nftData.file == null ?
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <div className="text-center">Drag and drop media or <span className="text-blue-500">Browse files</span></div>
                            <div className="text-sm text-gray-500">Max size: 50MB (JPG, PNG, GIF, SVG, MP4)</div>
                        </label> :
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <div className="text-center">{nftData.file.name}</div>
                        </label>
                    }
                </div>

                <div className="w-1/2">
                    {/* Name */}
                    <div className="">
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
                    <div className="">
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

                    {/* Author */}
                    <div className="">
                        <label className="block text-sm font-medium">Supply *</label>
                        <input
                            type="text"
                            name="author"
                            value={nftData.author}
                            onChange={handleChange}
                            placeholder="Original creator "
                            className="w-full p-2 bg-gray-700 rounded-lg text-white"
                            required
                        />
                    </div>


                    {/* Description */}
                    <div className="">
                        <label className="block text-sm font-medium">Description *</label>
                        <textarea
                            name="description"
                            value={nftData.description}
                            onChange={handleChange}
                            placeholder="Enter a description"
                            className="w-full p-2 bg-gray-700 rounded-lg text-white"
                            required
                        />
                    </div>

                    {/* External link */}
                    <div className="">
                        <label className="block text-sm font-medium">External Link</label>
                        <input
                            type="text"
                            name="externalLink"
                            value={nftData.externalLink}
                            onChange={handleChange}
                            min={4}
                            placeholder="http://puff{market}.com"
                            className="w-full p-2 bg-gray-700 rounded-lg text-white"
                        />
                    </div>

                    {/* Traits Section */}
                    <div className="">
                        <h1 className="block text-sm font-medium">Traits</h1>
                        <p>Traits describe attributes of your item. They appear as filters inside your collection page and are also listed out inside your item page.</p>
                        {nftData.traits.map((trait, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    name="key"
                                    value={trait.key}
                                    onChange={(e) => handleTraitChange(index, e)}
                                    placeholder="Trait name"
                                    className="flex-1 p-2 bg-gray-700 rounded-lg text-white"
                                />
                                <input
                                    type="text"
                                    name="value"
                                    value={trait.value}
                                    onChange={(e) => handleTraitChange(index, e)}
                                    placeholder="Trait value"
                                    className="flex-1 p-2 bg-gray-700 rounded-lg text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTrait(index)}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddTrait}
                            className="text-blue-500 hover:underline text-sm"
                        >
                            + Add trait
                        </button>
                    </div>
                </div>

            </form>

            {/* Create Button */}
            <div className="w-full flex justify-end items-center bottom-0 h-10 z-3 right-0 border-t border-gray-700 py-8 px-20">

                <button
                    onClick={handleSubmit}
                    className=" bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 transition h-fit font-bold"
                >
                    Create
                </button>
            </div>
        </div>
    );
};

export default CreateNFT;