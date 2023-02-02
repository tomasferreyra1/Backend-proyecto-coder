import messageApi from '../../api/message.js'
import { normalizeMessage } from '../../normalization/index.js'

export default async function configurarSocket(socket, sockets) {
    socket.emit('mensajes', normalizeMessage(await messageApi.listarAll()));

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await messageApi.guardar(mensaje)
        sockets.emit('mensajes', normalizeMessage(await messageApi.listarAll()));
    })
}