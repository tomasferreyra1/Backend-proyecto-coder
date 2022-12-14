const config = require("../../config/config")
const contenedor = require("../../container/firebase")

const productos = new contenedor("products")

const crud = async () => {
    await config.initFirebase()
    await productos.save({ title: "Nissan Skyline", price: 188982378, thumbnail: "https://img.remediosdigitales.com/50967d/captura-de-pantalla-2022-08-26-a-las-17.38.32/1366_2000.jpeg" })
    await productos.getAll()
    await productos.getById("qA1wrmaL9rcUY4yHIEZH")
    await productos.deleteById("qA1wrmaL9rcUY4yHIEZH")
    await productos.deleteAll()
}

crud()