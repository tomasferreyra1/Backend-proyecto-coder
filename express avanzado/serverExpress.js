const Archivo = require('./Archivos.js');
const express = require('express');
const app = express();
const PORT = 8080;
const archivo = new Archivo('productos.txt')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (pet, res) => {
    res.send('Hola, bienvenidos al servidor de express!');
})
app.get('/productos', async (pet,res) => {
    const productsAll = await archivo.getAll();
    res.json(productsAll);
})
app.get('/productoRandom', async (pet, res) => {
    const productsAll = await archivo.getAll();
    const numMax = productsAll.length;

    const numRandom = getRandomN(1,numMax);
    const randomProduct = await archivo.getById(numRandom);
    
    res.json(randomProduct);
})

const getRandomN = (min,max) => {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

const server = app.listen(PORT, () => {
    console.log(`Servidor: ${server.address().port}`);
})

server.on('error',error => console.log(`Error: ${error}`));