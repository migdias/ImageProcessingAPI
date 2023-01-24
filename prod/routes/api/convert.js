"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resizeImg_1 = __importDefault(require("../../utilities/resizeImg"));
const convert = express_1.default.Router();
convert.get('/', (async (req, res) => {
    /**
     * converts an image file into a resized version of it and writes it to data/out
     * @param filename is the name of the image to resize
     * @param width is the desired width
     * @param height is the desired height
     */
    async function convert(filename, width, height) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [outFilePath, _didConvert] = await resizeImg_1.default.resizeImg(filename, width, height);
        res.sendFile(outFilePath);
    }
    // Getting the query parameters
    const imgParams = req.query;
    // if image parameter is not given, error and sends
    if (!('imgName' in imgParams)) {
        res.status(400);
        res.send('ERROR: imgName parameter not found in url');
        return;
    }
    // if input file does not exist, error and sends
    if (!resizeImg_1.default.inFileExists(imgParams.imgName)) {
        res.status(400);
        res.send('Image does not exist. Make sure it is in data/in and the name is correct.');
        return;
    }
    // declaring variables for the convert async function
    const filename = String(imgParams.imgName);
    let width;
    let height;
    // if width and height exists
    if (('width' in imgParams) && ('height' in imgParams)) {
        // if size exists throws error and sends
        if ('size' in imgParams) {
            res.status(400);
            res.send('ERROR: Cannot have both width/height and size at the same time. Chose one');
            // if size doesnt exist then resize with height and width
        }
        else {
            width = Number(imgParams.width);
            height = Number(imgParams.height);
            await convert(filename, width, height);
        }
    }
    else { // if width or height is not in params
        if ('size' in imgParams) {
            width = height = Number(imgParams.size);
            await convert(filename, width, height);
        }
        else {
            res.status(400);
            res.send('ERROR: No parameters for dimensions (size or width/height)');
        }
    }
}));
exports.default = convert;
