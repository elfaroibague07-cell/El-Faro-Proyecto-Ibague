import express from 'express'

import uploadRoutes from './routes/upload.routes'
import productRoutes from './routes/product.routes'
import categoryRoutes from './routes/category.routes'
import baseRoutes from './routes/base.routes'

const app = express()

//comentariosss ddd

app.use(express.json())

app.use('/api/upload', uploadRoutes)

app.use(
  '/api/products',
  productRoutes
)

app.use(
  '/api/categories',
  categoryRoutes
)

app.use(
  '/api/bases',
  baseRoutes
)

export default app
