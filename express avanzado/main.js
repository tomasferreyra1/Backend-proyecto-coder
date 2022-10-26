const Archivo = require('./Archivos.js')

const producto = new Archivo('./productos.txt');

const mainFunction = async () => {

    producto.save({ title: 'Remera', price: 6788, thumbnail: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/205/102/products/remera-lisa-vi-rj1-122009f0e7fe0bfa3715906956218434-480-0.jpg'});
    
    //Get by id:
    const getid = await producto.getById(2);
    console.log(getid)
    
    //Delete by id
    await producto.deleteById(1);
    
    //Get all:
    const getall = await producto.getAll();
    console.log(getall)
    
    //Delete all
    await producto.deleteAll();
    

}

mainFunction();


