import express from 'express'
import { errorHandler } from './shared/middlewares/error.midleware'
import categoryRouter from './category/category.routes'
import serviceRouter from './service/service.routes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Example route
app.use('/category', categoryRouter)
app.use('/service', serviceRouter)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})