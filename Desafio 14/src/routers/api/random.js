import { Router } from "express";
import { calculate } from "../../api/random";

const randomApiRouter = new Router();

randomApiRouter.get('/api/random', async (req,res) => {
    
    // Obtenemos la cantidad por query params
    let cantidad = parseInt(req.query.cant);

    if (isNaN(cantidad)) {
        cantidad = 100000000;
    }

    const result = await calculate(cantidad);

    res.json({
        resultado: result
    });

    // Llamar la function del api, mandar la cant y recibir el res
    // res.json(result)
}) 

export default randomApiRouter