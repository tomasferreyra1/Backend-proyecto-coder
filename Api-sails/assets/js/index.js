/* eslint-disable no-undef */
/* const socket = io()
//Esquemas
const authorSchema = new normalizr.schema.Entity("author", {}, {idAttribute: "email"})
const mensajeSchema = new normalizr.schema.Entity("mensaje", {
    author: authorSchema
}, {idAttribute: "id"})
const mensajesSchema = new normalizr.schema.Entity("mensajes", {
    mensajes: [mensajeSchema]
}, {idAttribute: "id"})
socket.on('connection', (socket) => {
    console.log('Usuario conectado')
})
socket.on('mensajes', (data) => {
    const mensajesDesnormalizados = normalizr.denormalize(data.result, mensajesSchema, data.entities)
    const tamañoMensajesNormalizados = JSON.stringify(data).length
    const tamañoMensajesSinNormalizar = JSON.stringify(mensajesDesnormalizados).length
    const porcentaje = (tamañoMensajesNormalizados / tamañoMensajesSinNormalizar) * 100
    const listaMensajes = document.getElementById("mensajes")
    const porcentajeHtml = document.getElementById("porcentaje")
    porcentajeHtml.innerHTML = `(Compresion: %${porcentaje.toFixed(1)})`
    mensajesDesnormalizados.mensajes.forEach((mensaje)=>{
        const mensajeContainer = document.createElement('div')
        mensajeContainer.className = "mensaje"
        mensajeContainer.innerHTML = `
        <h3 class="email"> ${mensaje._doc.author.email} </h3> <h3  class="fecha"> ${mensaje._doc.author.fecha}: </h3> <h4> ${mensaje._doc.text} </h4>
        <img class="avatar" src=${mensaje._doc.author.avatar} alt=${mensaje._doc.author.nombre}>
        `
        listaMensajes.appendChild(mensajeContainer)
    })
})
socket.on('mensajeNuevo', (data) => {
    const listaMensajes = document.getElementById("mensajes")
    const mensajeContainer = document.createElement('div')
    mensajeContainer.className = "mensaje"
    mensajeContainer.innerHTML = `
        <h3 class="email"> ${data.author.email} </h3> <h3  class="fecha"> ${data.author.fecha}: </h3> <h4> ${data.text} </h4>
        <img class="avatar" src=${data.author.avatar} alt=${data.author.nombre}>
        `
    listaMensajes.appendChild(mensajeContainer)
})
socket.on('productos', (data) => {
    const listaProductos = document.getElementById("listaProductos")
    data.forEach(producto => {
        const productoFila = document.createElement("tr");
        productoFila.innerHTML = `
                            <td> ${producto.title} </td>
                            <td> ${producto.price} </td>
                            <td><img src=${producto.thumbnail} alt=${producto.title}></td>
        `
        listaProductos.appendChild(productoFila)
    });
})
socket.on('productoNuevo', (data) => {
    const listaProductos = document.getElementById("listaProductos")
    const productoFila = document.createElement("tr");
    productoFila.innerHTML = `
                            <td> ${data.title} </td>
                            <td> ${data.price} </td>
                            <td><img src=${data.thumbnail} alt=${data.title}></td>
        `
    listaProductos.appendChild(productoFila)
})
const enviarProducto = (e) => {
    console.log('Producto enviado')
    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const thumbnail = document.getElementById("thumbnail").value
    const producto = {
        title: title,
        price: price,
        thumbnail: thumbnail
    }
    socket.emit('producto', producto)
    return false
}
const obtenerProductosQuery = `
    query{
        obtenerProductos{
        _id,
        title,
        price,
        thumbnail
        }
    }
`
const eliminarProductosQuery = `
    mutation{
        eliminarProductos(type: "all"){
        _id
        }
    }
`
*/

const renderProductos = async () => {
  const data = await axios.get('/productos/find')
  console.log(data.data)
  data.data.forEach((producto) => {
    const listaProductos = document.getElementById('listaProductos')
    const productoFila = document.createElement('tr')
    productoFila.innerHTML = `
                            <td> ${producto.title} </td>
                            <td> ${producto.price} </td>
                            <td><img src=${producto.thumbnail} alt=${producto.title}></td>
        `
    listaProductos.appendChild(productoFila)
  })
}

renderProductos()

const renderMensajes = async () => {
  const data = await axios.get('/mensajes/find')
  data.data.forEach((mensaje) => {
    const listaMensajes = document.getElementById('mensajes')
    const mensajeContainer = document.createElement('div')
    mensajeContainer.className = 'mensaje'
    mensajeContainer.innerHTML = `
        <h3 class="email"> ${mensaje.email} </h3> <h4> ${mensaje.text} </h4>
        <img class="avatar" src=${mensaje.avatar} alt=${mensaje.nombre}>
        `
    listaMensajes.appendChild(mensajeContainer)
  })
}

renderMensajes()
