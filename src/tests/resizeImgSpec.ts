import resize from '../utilities/resizeImg'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const outDataPath = path.resolve('./data/out/')
const sampleImage = 'sample'

const outResizedImgPath = path.resolve(outDataPath, 'resized_' + sampleImage + '.jpg')

describe('Testing resizeImg Module', () => {
  // before all its going to delete a processed image if exists.
  // If out folder doesnt exist, create it
  beforeAll(() => {
    if (fs.existsSync(outDataPath)) {
      if (fs.existsSync(outResizedImgPath)) {
        fs.unlinkSync(outResizedImgPath)
      }
    } else {
      fs.mkdirSync(outDataPath)
    }
  })
  // remove the file afterwards
  afterAll(() => {
    if (fs.existsSync(outResizedImgPath)) {
      fs.unlinkSync(outResizedImgPath)
    }
  })
  describe('Input Image Availability', () => {
    it('Input image (only imgName) does not exist returns false', () => {
      expect(resize.inFileExists(sampleImage + 'g')).toBeFalse()
    })
    it('Input image (only imgName) exists returns true', () => {
      expect(resize.inFileExists(sampleImage)).toBeTrue()
    })
  })
  describe('Check if resizing of an image works', () => {
    let w = 500
    let h = 500

    // Create a resized image and and check if was written and is the right dimensions
    it('Create a resized image 500x500', async () => {
      const [outFilePath, didConvert] = await resize.resizeImg(sampleImage, w, h)

      const imgMetadata = await sharp(outFilePath).metadata()

      expect(imgMetadata.height).toEqual(w)
      expect(imgMetadata.width).toEqual(h)
      expect(didConvert).toBeTrue()
      expect(outFilePath).toMatch(outResizedImgPath)
    })
    it('When creating the same image with 500x500, only load and not convert', async () => {
      const [outFilePath, didConvert] = await resize.resizeImg(sampleImage, w, h)

      expect(outFilePath).toMatch(outResizedImgPath)
      expect(didConvert).toBeFalse()
    })
    it('Create a new image with 800x600. Should reconvert', async () => {
      w = 800
      h = 600
      const [outFilePath, didConvert] = await resize.resizeImg(sampleImage, w, h)

      const imgMetadata = await sharp(outFilePath).metadata()

      expect(imgMetadata.height).toEqual(h)
      expect(imgMetadata.width).toEqual(w)
      expect(outFilePath).toMatch(outResizedImgPath)
      expect(didConvert).toBeTrue()
    })
  })
})
