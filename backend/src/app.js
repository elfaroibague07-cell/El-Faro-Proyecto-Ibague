import express from 'express'

import uploadRoutes from './routes/upload.routes.js'
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import baseRoutes from './routes/base.routes.js'

const app = express()

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