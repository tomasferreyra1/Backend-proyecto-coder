import config from '../config.js'

import ContenedorArchivo from '../containers/ContainerArchivo.js'

const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}/messages.json`)

export default mensajesApi