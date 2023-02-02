import { fork } from 'child_process';
import path from 'path';

function calculate(cant) {
    return new Promise((res,rej) => {
        // hacemos el fork del script
        const child = fork('./scripts/calculateRandom.js');

        child.on('message', param => {
            if (param === 'ready') {
                child.send(cant);
            } else {
                res(param);
            }
        });
        // Enviamos un param conteniendo la cant una vez el script este lleno
        // Escuchamos el script y al terminar mandamos el msj por medio de resolve(msj)
    });
};

export { calculate }