import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'

const productsWebRouter = new Router()

productsWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

productsWebRouter.get('/home', webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), {
        username: req.user.username,
        contador: req.user.contador
    })
})

productsWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/products.html'))
})

export default productsWebRouter