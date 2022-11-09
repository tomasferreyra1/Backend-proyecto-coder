const { urlencoded } = require("express");
const express = require('express');
const app = express();
const PORT = 8080;

//Parse obj to pet.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Handlebars
const handlebars = require("express-handlebars");
app.engine ("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/partials"
}));
app.set('views', __dirname + './views'); //Directorio
app.set('view engine', 'hbs'); // Motor de plantilla


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

const product = new Container([]);

// Data-test

product.save({
    title: 'Ford Fiesta Kinetic SE',
    price: '1.019.700',
    thumbnail: 'image1'
});
product.save({
    title: 'Chevrolet Cruize LTZ',
    price: '6.913.000',
    thumbnail: 'image2'
});
product.save({
    title: 'Ford Maverik XTL',
    price: '7.212.000',
    thumbnail: 'image3'
});
product.save({
    title: 'Mercedes Benz Clase G',
    price: '12.629.000',
    thumbnail: 'image4'
});

// List

app.get('/productos', (pet,res) => {
    const productList = product.getsAll();
    res.render("productList", {productList});
});

app.get('/', (pet,res) => {
    res.render("form", {})
});

app.post('/productos',(pet,res) => {
    const body = pet.body;
    product.save(body);
    res.redirect("/");
});


// --Server--

const server = app.listen(PORT, () => {
    console.log(`Server listen: ${server.address().port}`);
});

server.on('error', error => console.log(`Error: ${error}`));