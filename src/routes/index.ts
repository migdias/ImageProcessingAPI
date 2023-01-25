import express, { Request, Response } from 'express'
import convert from './api/convert'

const routes = express.Router()

routes.get('/', (req: Request, res: Response): void => {
  res.send('Welcome to the Image Processing API.')
})

routes.use('/convert', convert)

export default routes
