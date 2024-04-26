import sharp from "sharp";
import axios from "axios";

const converImgToBuffer = async (imageURL) => {
    try {
        const imageResponse = await axios.get(imageURL, {
            responseType: "arraybuffer",
        });
        const buffer = await sharp(imageResponse.data)
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();
        return buffer
    } catch (error) {
        console.log(error)
    }
}

export {
    converImgToBuffer
}