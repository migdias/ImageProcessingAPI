"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
// stop sharp cache otherwise we cant see weather the old file is the same as the wished file
sharp_1.default.cache(false);
const inDataPath = '/Users/miguelangelo.rodrigu/Documents/Udacity/FullStackDeveloper/C1/PROJECT/data/in/';
const outDataPath = '/Users/miguelangelo.rodrigu/Documents/Udacity/FullStackDeveloper/C1/PROJECT/data/out/';
/**
 * Takes an image stored in /data/in and it resizes it.
 * @param inImg is the image the be resized (should be place in /data/in)
 * @param w is the wished width for the new image.
 * @param h is the wished height for the new image.
 * @returns the new resized image file path
 */
async function resizeImg(inImg, w, h) {
    const inFilePath = inDataPath + inImg;
    const outFilePath = outDataPath + 'resized_' + inImg;
    const doesImgExist = await ProcessedImgExists(outFilePath, w, h);
    let didConvert = false;
    if (!doesImgExist) {
        await (0, sharp_1.default)(inFilePath).resize({ width: w, height: h }).toFile(outFilePath);
        didConvert = true;
    }
    return [outFilePath, didConvert];
}
/**
 * Takes an resize image request and checks if that image already exists.
 * @param imgPath is the image path to be checked.
 * @param w is the wished width for the resize.
 * @param h is the wished height for the resize.
 * @returns true if the resized image already exists. Otherwise returns false.
 */
async function ProcessedImgExists(imgPath, w, h) {
    if (fs_1.default.existsSync(imgPath)) {
        const imgMetadata = await (0, sharp_1.default)(imgPath).metadata();
        if (imgMetadata.width === w && imgMetadata.height === h) {
            return true;
        }
    }
    // case none of the above work
    return false;
}
/**
 * checks whether an input file exists
 * @param filename is the name of the file in the "in" folder to check
 * @returns true if the input file exists, otherwise returns false
 */
const inFileExists = (filename) => {
    if (fs_1.default.existsSync(inDataPath + filename)) {
        return true;
    }
    return false;
};
exports.default = {
    resizeImg,
    ProcessedImgExists,
    inFileExists
};
