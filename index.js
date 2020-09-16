const express = require('express')
const bodyParser = require('body-parser')
const productRouter = require('./src/routes/products_routes')
const ctgRouter = require('./src/routes/category_routes')
const historyRouter = require('./src/routes/history_routes')
const userRouter = require('./src/routes/users_routes')
const cors = require('cors')
const { authentication, authorization } = require('./src/helpers/auth')
const { PORT } = require('./src/helpers/env')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('src/uploads'))
app.use('/api/v1/product', authentication, authorization, productRouter)
app.use('/api/v1/category', authentication, authorization, ctgRouter)
app.use('/api/v1/history', authentication, authorization, historyRouter)
app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})