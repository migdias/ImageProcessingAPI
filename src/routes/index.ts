import express, { Request, Response } from 'express'
import convert from './api/convert'
import fs from 'fs'

// check data directories

const inFolder = './data/in'
const outFolder = './data/out'

if (!fs.existsSync(inFolder)) {
  fs.mkdirSync(inFolder)
}
if (!fs.existsSync(outFolder)) {
  fs.mkdirSync(outFolder)
}

// starting application
const routes = express.Router()

routes.get('/', (req: Request, res: Response): void => {
  res.send('Welcome to the Image Processing API.')
})

routes.use('/convert', convert)

export default routes
