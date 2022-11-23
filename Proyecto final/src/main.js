const { urlencoded } = require("express");
const express = require('express');
const app = express();
const routeProducts = express.Router();
const routeCart = express.Router();
const PORT = process.env.PORT || 8080;

// Auth
const dotenv = require('dotenv');
dotenv.config();
const authMiddleware = app.use((req,res,next) => {
    req.header('autorization') == process.env.TOKEN ? next() : res.status(401).json({"error": "unauthorized"})
})

//Parse obj to pet.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Imlpement Routes
app.use('/api/products',routeProducts);
app.use('/api/cart', routeCart);

// ENV
const dotenv = require('dotenv');
dotenv.config();

// Auth middleware
const middlewareAuth = app.use((req,res,next) => {
    req.header('authoriaztion') == process.env.TOKEN ? next() : res.status(401).json({"error":"unauthorized route"})
})

// Endpoints
routeProducts.get('/', async (req, res) => {
    const products = await newProduct.getAll()
    res.status(200).json(products)
})

// Container
const fs = require('fs');

class Container {
    constructor(products) {
        this.products = products;
    }

    save(object) {
        let id = 1;
        this.products.forEach((element, index) => {
            if (element.id >= id) {
                id = element.id + 1;
            }
        });
        object.id = id;
        this.products.push(object);
        return id;
    }

    getsById(id) {
        let objectSelected = null;
        this.products.forEach(element => {
            if (id === element.id) {
                objectSelected = element;
            }
        });
        return objectSelected;
    }

    getsAll() {
        return this.products;
    }

    deleteById(id) {
        let objectToDelete = null;
        this.products.forEach(element => {
            if (id === element.id) {
                objectToDelete = element;
            }
        })
        if (objectToDelete != -1) {
            this.products.splice(objectToDelete, 1);
        }
    }

    deleteAll() {
        this.products = [];
    }

    async updateById(id, object) {
        try {
            let info = await fs.promises.readFile(this.products, 'utf8')
            let result = JSON.parse(info)

            const objectToUpdate = result.find(product => product.id === id)
            if (objectToUpdate) {
                const index = result.indexOf(objectToUpdate)

                result[index]['title'] = object.title
                result[index]['price'] = object.price
                result[index]['thumbnail'] = object.thumbnail
                await fs.promises.writeFile(this.products, JSON.stringify(result, null, 2))
                return true
            } else {
                console.log(`Id ${id} no existe`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    /* Cart */
    async addToCartById(id, object) {
        try {
            id = Number(id)
            let info = await fs.promises.readFile(this.products, 'utf8')
            let result = JSON.parse(info)

            const objectToAdd = result.find(product => product.id === id)
            if (objectToAdd) {
                const index = result.indexOf(objectToAdd)
                const getValue = result[index]
                const getProducts = getValue['products']
                getProducts.push(object.products)

                await fs.promises.writeFile(this.products, JSON.stringify(result, null, 2))
                return true
            } else {
                console.log(`Id ${id} doesn't exists or content is wrong`)
                return false
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async removeFromCartById(id, idObjToRemove, objKey) {
        try {
            id = Number(id)
            let info = await fs.promises.readFile(this.products, 'utf8')
            let result = JSON.parse(info)

            const objectToUpdate = result.find(product => product.id === id)
            if (objectToUpdate) {
                const index = result.indexOf(objectToUpdate)

                const getValue = result[index][objKey]
                let indexToRemove = -1
                getValue.forEach((element, indexN) => {
                    if (element.id == idObjToRemove) {
                        indexToRemove = indexN
                    }
                })

                const newArray = [...getValue]

                if (indexToRemove > -1) {
                    newArray.splice(indexToRemove, 1)
                }

                result[index][objKey] = newArray
                await fs.promises.writeFile(this.products, JSON.stringify(result, null, 2))
                return true
            } else {
                console.log(`Id ${id} doesn't exists`)
                return false
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}


// Container
const newProduct = new Container("./src/database/productos.json",["timestamp","title","price","description","code","image","stock"]);
const newCart = new Container("./src/database/cart.json",["timestamp","products"]);



// Endpoints
//getAll > api/productos
routeProducts.get('/', async (req, res) => {
    const products = await newProduct.getAll()
    res.status(200).json(products)
})

//getById > api/productos/:id
routeProducts.get('/:id', async (req, res) => {
    const getId = req.params.id
    const product = await newProduct.getById(getId)
    product
        ? res.status(200).json(product)
        : res.status(400).json({ "Error": "Product/s doesn't exist" })
})

//post (save) > api/productos
routeProducts.post('/', middlewareAuth, async (req, res, next) => {
    const getBody = req.body
    getBody.timestamp = Date.now()
    const newProductId = await newProduct.save(getBody)

    newProductId
        ? res.status(200).json({ "Success": "Product successfully added with ID: " + newProductId })
        : res.status(400).json({ "Error": "Please verify the body content" })
})

//Put > api/productos/:id
routeProducts.put('/:id', middlewareAuth, async (req, res, save) => {
    const getId = req.params.id
    const getBody = req.body
    const wasUpdated = await newProduct.updateById(getId, getBody)

    wasUpdated
        ? res.status(200).json({ "Success": "Product updated successfully" })
        : res.status(404).json({ "Error": "Product/s doesn't exist" })
})

//Delete > /api/productos/:id
routeProducts.delete('/:id', middlewareAuth, async (req, res, next) => {
    const getId = req.params.id
    const wasDeleted = await newProduct.deleteById(getId)

    wasDeleted
        ? res.status(200).json({ "Success": "Product successfully removed" })
        : res.status(404).json({ "Error": "Product/s doesn't exist" })
})

// CART 
//post (carrito) > /api/carrito
routeCart.post('/', async (req, res) => {
    const getBody = req.body

    getBody.timestamp = Date.now()
    getBody.products = []
    const newCartId = await newCart.save(getBody)

    newCartId
        ? res.status(200).json({ "Success": "Product added to cart with ID: " + newCartId })
        : res.status(400).json({ "Error": "Please verify the body content" })
})

// POST /api/carrito/:id/productos
routeCart.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    const { body } = req

    const product = await newProduct.getById(body['id'])

    if (product) {
        const cartExist = await newCart.addToCartById(id, { "products": product })
        cartExist
            ? res.status(200).json({ "Success": "Product was successfully added to cart" })
            : res.status(404).json({ "Error": "Please verify the body content" })
    } else {
        res.status(404).json({ "Error": "Please verify the body content or ID" })
    }
})

//delete (carrito) > /api/carrito/id
routeCart.delete('/:id', async (req, res) => {
    const getId = req.params.id
    const wasDeleted = await newCart.deleteById(getId);

    wasDeleted
        ? res.status(200).json({ "Success": "Cart was successfully removed." })
        : res.status(404).json({ "Error": "Cart doesn't exist" })
})

//getCartProductsById /api/carrito/:id/productos
routeCart.get('/:id/productos', async (req, res) => {
    const getId = req.params.id
    const cart = await newCart.getById(getId)

    cart
        ? res.status(200).json(cart.products)
        : res.status(404).json({ "Error": "Cart doesn't exists" })
})

//delete /api/carrito/:id/productos/:idProd
routeCart.delete('/:id/productos/:idProd', async (req, res) => {
    const { id, idProd } = req.params
    const productExists = await newProduct.getById(idProd)
    if (productExists) {
        const cartExists = await newCart.removeFromCartById(id, idProd, 'products')
        cartExists
            ? res.status(200).json({ "Success": "Product was successfully removed from cart." })
            : res.status(404).json({ "Error": "Cart doesn't exists" })
    } else {
        res.status(404).json({ "Error": "Product doesn't exists" })
    }
})

// --Server--

const server = app.listen(PORT, () => {
    console.log(`Server listen: ${server.address().port}`);
});

server.on('error', error => console.log(`Error: ${error}`));