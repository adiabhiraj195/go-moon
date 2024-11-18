import { PinataSDK, FileObject } from "pinata-web3";

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: "example-gateway.mypinata.cloud",
});

export async function uploadImageToPinata(file: FileObject) {
    try {
        return await pinata.upload.file(file).group("f8925ba8-d341-4497-bd34-90f773140237");
        // console.log(upload);
    } catch (error) {
        console.log(error);
    }
}
export async function uploadMetadataToPinata(metadata: {
    name: string;
    image: string;
    description: string;
    traits: { key: string, value: string }[];
    externalLink: string;
    author?: string;
    type: string;

}) {
    try {
        return await pinata.upload.json(metadata).group("d1103bac-5de6-4276-9dc7-adf0091882dd");
        // console.log(upload);
    } catch (error) {
        console.log(error);
    }
}