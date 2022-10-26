const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(objeto) {
    try {
      if (fs.existsSync(this.archivo)) {
        let info = await fs.promises.readFile(this.archivo, 'utf8');
        let res = JSON.parse(info);

        if (res.length > 0) {
          let ultId = res.length;
          let newProduct = {
            id: ultId,
            ...objeto
          }
          res.push(newProduct);
          await fs.promises.writeFile(this.archivo, JSON.stringify(res, null, 2))
          return ultId;
        } else {
          let newProduct = {
            id: 1,
            ...objeto
          }
          res.push(newProduct);
          await fs.promises.writeFile(this.archivo, JSON.parse(res, null, 2))
          return 1;
        }
      } else {
        let newProduct = {
          id: 1,
          ...objeto
        }
        await fs.promises.writeFile(this.archivo, JSON.stringify([newProduct], null, 2))
        return 1;
      }
    } catch (error) {
      console.log(`Error agregando el producto: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      let info = await fs.promises.readFile(this.archivo,'utf8')
      let res = JSON.parse(info)
      return res.find(product => product.id === id)
    } catch (error) {
      console.log(`Error buscando producto con el id: ${error.message}`);
    }
  }

  async getAll() {
    try {
      let info = await fs.promises.readFile(this.archivo,'utf8')
      let res = JSON.parse(info)
      return res;
    } catch (error) {
      console.log(
        `Error obteniendo todos los productos: ${error.message}`
      );
    }
  }

  async deleteById(id) {
    try {
      let info = fs.promises.readFile(this.archivo,'utf8');
      let res = JSON.parse(info);

      const deleteObject = res.find(producto => producto.id === id);
      if (deleteObject) {
        const i = res.indexOf(deleteObject);
        res.splice(1,i);
        await fs.promises.writeFile(this.archivo,JSON.stringify(res,null,2))
      } else {
        console.log(`Id ${id} no existe`)
      }
    } catch (error) {
      console.log(
        `Ocurrio un error eliminando el producto con el id solicitado: ${error.message}`
      );
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.archivo,JSON.stringify([]))
  }
}

module.exports = Contenedor;

