"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resizeImg_1 = __importDefault(require("../utilities/resizeImg"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const outDataPath = '/Users/miguelangelo.rodrigu/Documents/Udacity/FullStackDeveloper/C1/PROJECT/data/out/';
const sampleImage = 'sample.jpg';
const outResizedImgPath = outDataPath + 'resized_' + sampleImage;
describe('Testing resizeImg Module', () => {
    // before all its going to delete a processed image if exists
    beforeAll(() => {
        if (fs_1.default.existsSync(outResizedImgPath)) {
            fs_1.default.unlinkSync(outResizedImgPath);
        }
    });
    // remove the file afterwards
    afterAll(() => {
        if (fs_1.default.existsSync(outResizedImgPath)) {
            fs_1.default.unlinkSync(outResizedImgPath);
        }
    });
    describe('Input Image Availability', () => {
        it('Input image (only imgName) does not exist returns false', () => {
            expect(resizeImg_1.default.inFileExists(sampleImage + 'g')).toBeFalse();
        });
        it('Input image (only imgName) exists returns true', () => {
            expect(resizeImg_1.default.inFileExists(sampleImage)).toBeTrue();
        });
    });
    describe('Check if resizing of an image works', () => {
        let w = 500;
        let h = 500;
        // Create a resized image and and check if was written and is the right dimensions
        it('Create a resized image 500x500', async () => {
            const [outFilePath, didConvert] = await resizeImg_1.default.resizeImg(sampleImage, w, h);
            const imgMetadata = await (0, sharp_1.default)(outFilePath).metadata();
            expect(imgMetadata.height).toEqual(w);
            expect(imgMetadata.width).toEqual(h);
            expect(didConvert).toBeTrue();
            expect(outFilePath).toMatch(outResizedImgPath);
        });
        it('When creating the same image with 500x500, only load and not convert', async () => {
            const [outFilePath, didConvert] = await resizeImg_1.default.resizeImg(sampleImage, w, h);
            expect(outFilePath).toMatch(outResizedImgPath);
            expect(didConvert).toBeFalse();
        });
        it('Create a new image with 800x600. Should reconvert', async () => {
            w = 800;
            h = 600;
            const [outFilePath, didConvert] = await resizeImg_1.default.resizeImg(sampleImage, w, h);
            const imgMetadata = await (0, sharp_1.default)(outFilePath).metadata();
            expect(imgMetadata.height).toEqual(h);
            expect(imgMetadata.width).toEqual(w);
            expect(outFilePath).toMatch(outResizedImgPath);
            expect(didConvert).toBeTrue();
        });
    });
});
