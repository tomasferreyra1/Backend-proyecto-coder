const config = require("../../config/config")
const contenedor = require("../../container/mongodb")

const carritos = new contenedor("carritos", {
    timestamp: { type: String, require: true, max: 100 },
    productos: { type: Array, require: true }
})

const crud = async () => {
    await config.initMongoDB()
    /* await carritos.save({timestamp: 1670919375156,products: [{
        timestamp:1670919375156,
        title:"Nissan Skyline",
        description:"Description here",
        code:"n-sk",
        image:"https://img.remediosdigitales.com/50967d/captura-de-pantalla-2022-08-26-a-las-17.38.32/1366_2000.jpeg",
        price:188.982.378,
        stock:2
    }]}) */
    //await carritos.getAll()
    //await carritos.getById("63978a0b5f16cfcd9378ba7b")
    //await carritos.deleteAll()
    //await carritos.deleteById("63978a0b5f16cfcd9378ba7b")
}

crud()