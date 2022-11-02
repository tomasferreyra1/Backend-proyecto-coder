const { urlencoded } = require("express");
const express = require('express');
const app = express();
const {Router} = express;
const routeProducts = Router();
const fs = require('fs')
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(__dirname + '/public'));

class Container {
    constructor (products){
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
            this.products.splice(objectToDelete,1);
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
}

const products = new Container([]);

// Data-test

products.save({
    title: 'Ford Fiesta Kinetic SE',
    price: '1.019.700',
    thumbnail: 'image1'
});
products.save({
    title: 'Chevrolet Cruize LTZ',
    price: '6.913.000',
    thumbnail: 'image2'
});
products.save({
    title: 'Ford Maverik XTL',
    price: '7.212.000',
    thumbnail: 'image3'
});
products.save({
    title: 'Mercedes Benz Clase G',
    price: '12.629.000',
    thumbnail: 'image4'
});

// --Routes--

routeProducts.get('/api/products', (pet,res) => {
    const productList = products.getsAll();
    res.status(200).json(productList);
});

routeProducts.get('/api/products/:id', (pet,res) => {
    const id = pet.params.num;
    if (isNaN(id)) {
        res.status(404).send({error: 'El numero enviado no es valido'});
    } else {
        const productSelected = products.getsById(id);
        if (productSelected === []) {
            res.status(404).send(`El producto con id: ${id} no existe`);
        } else {
            res.status(200).json(productSelected);
        }
    }
});

routeProducts.post('/api/products',(pet,res) => {
    const body = pet.body;
    const newProductId = products.save(body);
    res.status(200).send(`Pruducto agregado correctamente con el id: ${newProductId}`);
});

routeProducts.put('/api/products/:id', async (pet, res) => {
    const id = pet.params.num;
    const body = pet.body;
    const productUpdate = await products.updateById(id, body);
    if (isNaN(id)) {
        res.status(404).send({ error: 'El numero enviado no es valido' });
    } else {
        if (productUpdate === []) {
            res.status(404).send(`El producto con id: ${id} no existe`);
        } else {
            res.status(200).send(`El producto con id: ${id}, ha sido actualizado`);
        }
    }
});

routeProducts.delete('/api/products/:id', (pet, res) => {
    const id = pet.params.num;
    if (isNaN(id)) {
        res.send({ error: 'El numero enviado no es valido' });
    } else {
        products.deleteById(id);
        res.json(products.getsAll());
    }
});

app.use('/api/productos', routeProducts);

// --Server--

const server = app.listen(PORT, () => {
    console.log(`Server listen: ${server.address().port}`);
});

server.on('error', error => console.log(`Error: ${error}`));