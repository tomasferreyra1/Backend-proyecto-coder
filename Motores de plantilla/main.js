const express = require('express');

const app = express();

const PORT = 8080;

app.set('views', __dirname + './views');
app.set('view engine', 'pug');


const server = app.listen(PORT, () => {
    console.log(`Server listening in port: ${server.address().port}`)
})

server.on('error', error => console.log(`An error has ocurred: ${error}`))