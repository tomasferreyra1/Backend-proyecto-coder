import config from '../config.js'

import ContenedorArchivo from '../containers/ContainerArchivo.js'

const productosApi = new ContenedorArchivo(`${config.fileSystem.path}/products.json`)

export default productosApi