import express from 'express'
import routes from './routes/index'

const app = express()
const port = 3000

// Default route for the home page
app.use('/', routes)

// Starting the express server
app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
})

export default app
