"use client"

import { useState } from "react";
import { uploadImageToPinata, uploadMetadataToPinata } from "@/lib/pinata";
import { NftContract } from "@/lib/ethersContract";
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
    type: string;
}
const CreateNFT = () => {
    const [nftData, setNftData] = useState<NftDataInterface>({
        name: '',
        supply: 1,
        description: '',
        file: null,
        externalLink: '',
        traits: [{ key: '', value: '' }],
        author: '',
        type: ''
    });
    const [loading, setLoading] = useState(false);
    const [assetPreview, setAssetPreview] = useState<string | null>(null);

    const { signer, account } = useWallet();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNftData({ ...nftData, file: e.target.files[0] });
        }
    };

    if (nftData.file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setAssetPreview(e.target?.result as string);
        };
        reader.readAsDataURL(nftData.file);

    } else {
        console.log("file does not catched")
    }

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
                author: nftData.author,
                type: nftData.type
            })

            //mint nft
            const metadataURI = "https://sapphire-keen-aardvark-438.mypinata.cloud/ipfs/".concat(metadataHash?.IpfsHash as string);
            const contract = NftContract(signer);

            const tx = await contract.mintNFT(account, metadataURI);
            tx.wait();

            setLoading(false);
            alert(`nft is minted to ${account}`);
            console.log("checkpoint-3")

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        console.log(nftData);
    };

    return (
        <div className="items-center text-white w-full px-5">
            {loading && <Loading />}
            <h1 className="text-3xl font-bold my-3 mt-6">Mint Your NFT 💦</h1>
            <p className="font-light text-gray-400">Once your item is minted you will not be able to change any of its information.</p>
            <form
                className="flex justify-between w-full m-3 mt-6 items-center"
                onSubmit={handleSubmit}
            >
                {/* File Upload Section */}
                <div className="border-dashed border-2 border-gray-600 rounded-lg flex flex-col items-center justify-center w-1/2 h-100 mr-10 overflow-hidden bg-cover bg-center">
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
                        <img src={assetPreview as string} alt="not loaded" className=""></img>

                    }
                </div>

                <div className="w-1/2">
                    {/* Name */}
                    <div className="my-2">
                        <label className="block text-lg font-bold mb-2">Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={nftData.name}
                            onChange={handleChange}
                            placeholder="Name your NFT"
                            className="w-full p-2 bg-gray1 rounded-lg text-white"
                            required
                        />
                    </div>

                    {/* Supply */}
                    <div className="my-2">
                        <label className="block text-lg font-bold mb-2">Supply *</label>
                        <input
                            type="number"
                            name="supply"
                            value={nftData.supply}
                            onChange={handleChange}
                            min={1}
                            className="w-full p-2 bg-gray1 rounded-lg text-white"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div className="my-2">
                        <label className="block ttext-lg font-bold mb-2">Author *</label>
                        <input
                            type="text"
                            name="author"
                            value={nftData.author}
                            onChange={handleChange}
                            placeholder="Original creator "
                            className="w-full p-2 bg-gray1 rounded-lg text-white"
                            required
                        />
                    </div>


                    {/* Description */}
                    <div className="my-2">
                        <label className="block text-lg font-bold mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={nftData.description}
                            onChange={handleChange}
                            placeholder="Enter a description"
                            className="w-full p-2 bg-gray1 rounded-lg text-white"
                            rows={4}
                            required
                        />
                    </div>

                    {/* External link */}
                    <div className="my-2">
                        <label className="block text-lg font-bold mb-2">External Link</label>
                        <input
                            type="text"
                            name="externalLink"
                            value={nftData.externalLink}
                            onChange={handleChange}
                            min={4}
                            placeholder="http://puff{market}.com"
                            className="w-full p-2 bg-gray1 rounded-lg text-white"
                        />
                    </div>

                    {/* nft type */}
                    <div className="my-2">
                        <label className="block text-lg font-bold mb-2">Type</label>

                        <div className="flex items-center justify-between">
                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    value="art"
                                    onChange={handleChange}
                                />
                                <label htmlFor="type" className="font-semibold">Art</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    value="gaming"
                                    onChange={handleChange}
                                />
                                <label htmlFor="type" className="font-semibold">Gaming</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    value="membership"
                                    onChange={handleChange}
                                />
                                <label htmlFor="type" className="font-semibold">Membership</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    value="pfps"
                                    onChange={handleChange}
                                />
                                <label htmlFor="type" className="font-semibold">PFPs</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    value="photography"
                                    onChange={handleChange}
                                />
                                <label htmlFor="type" className="font-semibold">Photography</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    value="music"
                                    onChange={handleChange}
                                />
                                <label htmlFor="type" className="font-semibold">Music</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name="type"
                                    value="other"
                                    onChange={handleChange}
                                    defaultChecked
                                />
                                <label htmlFor="type" className="font-semibold">Other</label>
                            </div>
                        </div>
                    </div>

                    {/* Traits Section */}
                    <div className="my-2">
                        <h1 className="block text-lg font-bold mb-2">Traits *</h1>
                        <p className="text-sm text-gray-400 mb-3">Traits describe attributes of your item. They appear as filters inside your collection page and are also listed out inside your item page.</p>
                        {nftData.traits.map((trait, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    name="key"
                                    value={trait.key}
                                    onChange={(e) => handleTraitChange(index, e)}
                                    placeholder="Trait name"
                                    className="flex-1 p-2 bg-gray1 rounded-lg text-white"
                                />
                                <input
                                    type="text"
                                    name="value"
                                    value={trait.value}
                                    onChange={(e) => handleTraitChange(index, e)}
                                    placeholder="Trait value"
                                    className="flex-1 p-2 bg-gray1 rounded-lg text-white"
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
            <div className="w-full flex justify-end items-center bottom-0 right-0 border-t border-gray-700 py-8 px-14">
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