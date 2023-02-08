import express from 'express';
import cluster from 'cluster';
import os from 'os';

const numProcesadores = os.cpus().length;

if (cluster.isPrimary && process.argv[3] == 'CLUSTER') {
    console.log(`Nuevo master: ${process.pid} corriendo, con ${numProcesadores} workers`);

    for (let i = 0; i < numProcesadores; i++) {
        cluster.fork(); // node server.js //modo-worker
    }

    cluster.on('exit', (worker) => {
        console.log(`The worker ${worker.process.pid} has died`);
        cluster.fork(); // node server.js //modo-worker
    });

} else {
    const app = express();

    const PORT = process.argv[2] || 8080;

    //app.use(express.static('public'));

    app.get('/datos', (req, res) => {
        res.send(`Server express in port: ${PORT}, Workers: ${numProcesadores}, PID: ${process.pid} - ${(new Date()).toLocaleString()}`);
    });

    app.get('/info', (req, res) => {
        res.send(`The numbers of processors are: ${numProcesadores}`);
    });

    app.get('/api/randoms', (req, res) => {
        res.send(`aca viene solo que va a randoms al ${PORT}`);
    });


    const servidor = app.listen(PORT, () => {
        console.log(`Worker in ${PORT}, PID: ${process.pid}`)
    });
}