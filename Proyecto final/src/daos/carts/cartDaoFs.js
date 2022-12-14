const Contenedor = require('../../container/carrito')

class Carrito extends Contenedor {
    constructor() {
        super('src/database/cart.json')
    }
}

module.exports = Carrito