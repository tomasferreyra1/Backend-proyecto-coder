const config = require("../../config/config")
const contenedor = require("../../container/firebase")

const carritos = new contenedor("carritos")

const crud = async () => {
    await config.initFirebase()
    await carritos.save({
        timestamp: 1670919375156, products: [{
            timestamp: 1670919375156,
            title: "Nissan Skyline",
            description: "Description here",
            code: "n-sk",
            image: "https://img.remediosdigitales.com/50967d/captura-de-pantalla-2022-08-26-a-las-17.38.32/1366_2000.jpeg",
            price: 188982378,
            stock: 2
        }]
    })
    //await carritos.getAll()
    //await carritos.getById("BkbH848eWU3fMkG7w5Ax")
    //await carritos.deleteById("BkbH848eWU3fMkG7w5Ax")
    //await carritos.deleteAll()
}

crud()