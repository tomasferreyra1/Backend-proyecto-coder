const Contenedor = require('../../container/container')

class Productos extends Contenedor {
    constructor() {
        super('src/database/productos.json')
    }
}

module.exports = Productos