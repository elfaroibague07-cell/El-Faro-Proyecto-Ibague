import express from 'express'
import uploadRoutes from './routes/upload.routes'
import productRoutes from './routes/product.routes'
const app = express()
//comentariosss
app.use(express.json())

app.use('/api/upload', uploadRoutes)
app.use(
  '/api/products',
  productRoutes
)
export default app