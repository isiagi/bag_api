import express from 'express';
import connect from './db/connect.js'
import authenticate from './middleware/authenticate.js'
import fileUpload from 'express-fileupload'

import rateLimiter from 'express-rate-limit'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

import authRoutes from './routes/authRouter.js'
import productRouters from './routes/Productroutes.js'
import orderRouters from './routes/orderRouter.js'

const app = express();

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60
}))

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1',authenticate, productRouters)
app.use('/api/v1/order',authenticate, orderRouters)

app.get('/', (req, res) => {
    res.send('hey')
})

const start = async () => {
    try {
        await connect()
        app.listen(5000, () => {
            console.log(`we are listening on port 5000`);
        }) 
    } catch (error) {
        console.log(error);
    }
}

start()

