import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import todoRouter from './routes/todoRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/', todoRouter)


app.use((err, req, res, next) => {
  const statusCode = err.status || 500
  res.status(statusCode).json({
    error: {
      message: err.message,
      status: statusCode
    }
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
