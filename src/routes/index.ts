import express from 'express'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Welcome to the Image Processing API.')
})

export default routes
