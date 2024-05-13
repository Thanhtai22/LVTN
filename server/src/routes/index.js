import authRouter from './auth'
import insertRouter from './insert'
import categoryRouter from './category'
import postRouter from './post'
import priceRouter from './price'
import areaRouter from './area'
import provinceRouter from './province'
import dictrictRouter from './dictrict'
import userRouter from './user'
import commentRouter from './comment'
import favoritePostRouter from './favoritePost'
// import contactRouter from './contact'

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/insert', insertRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/post', postRouter)
    app.use('/api/v1/price', priceRouter)
    app.use('/api/v1/area', areaRouter)
    app.use('/api/v1/province', provinceRouter)
    app.use('/api/v1/dictrict', dictrictRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/comment', commentRouter)
    app.use('/api/v1/favoritePost', favoritePostRouter)
    // app.use('/api/send-email', contactRouter)

    return app.use('/', (req, res) => {
        res.send('server on...')

    })
}

export default initRoutes