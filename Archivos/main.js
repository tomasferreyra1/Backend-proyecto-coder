const Contenedor = require('./Archivos')

const producto = new Contenedor('./productos.json');

producto.save({ title: 'Pantalon', price: 33, thumbnail: 'https://d368r8jqz0fwvm.cloudfront.net/26600-product_lg/pantalon-de-hombre-venture.jpg'});
producto.getById(2);
producto.getAll();
producto.deleteById(1);
producto.deleteAll()



