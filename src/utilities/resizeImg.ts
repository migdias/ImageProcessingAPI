import sharp from 'sharp'
import fs from 'fs'

// stop sharp cache otherwise we cant see weather the old file is the same as the wished file
sharp.cache(false)

const inDataPath = '/Users/miguelangelo.rodrigu/Documents/Udacity/FullStackDeveloper/C1/PROJECT/data/in/'
const outDataPath = '/Users/miguelangelo.rodrigu/Documents/Udacity/FullStackDeveloper/C1/PROJECT/data/out/'

/**
 * Takes an image stored in /data/in and it resizes it.
 * @param inImg is the image the be resized (should be place in /data/in)
 * @param w is the wished width for the new image.
 * @param h is the wished height for the new image.
 * @returns the new resized image file path
 */
async function resizeImg(inImg: string, w: number, h: number): Promise<[string, boolean]> {
  const inFilePath = inDataPath + inImg + '.jpg'
  const outFilePath = outDataPath + 'resized_' + inImg + '.jpg'
  const doesImgExist: boolean = await ProcessedImgExists(outFilePath, w, h)
  let didConvert: boolean = false

  if (!doesImgExist) {
    await sharp(inFilePath).resize({ width: w, height: h }).toFile(outFilePath)
    didConvert = true
  }

  return [outFilePath, didConvert]
}

/**
 * Takes an resize image request and checks if that image already exists.
 * @param imgPath is the image path to be checked.
 * @param w is the wished width for the resize.
 * @param h is the wished height for the resize.
 * @returns true if the resized image already exists. Otherwise returns false.
 */
async function ProcessedImgExists(imgPath: string, w: number, h: number): Promise<boolean> {
  if (fs.existsSync(imgPath)) {
    const imgMetadata = await sharp(imgPath).metadata()

    if (imgMetadata.width === w && imgMetadata.height === h) {
      return true
    }
  }
  // case none of the above work
  return false
}

/**
 * checks whether an input file exists
 * @param filename is the name of the file in the "in" folder to check
 * @returns true if the input file exists, otherwise returns false
 */
const inFileExists = (filename: string): boolean => {
  if (fs.existsSync(inDataPath + filename + '.jpg')) {
    return true
  }
  return false
}

export default {
  resizeImg,
  ProcessedImgExists,
  inFileExists
}
