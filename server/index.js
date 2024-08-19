const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const setupDb = require('./database')

setupDb();

const app = express();

app.use(cors());

app.use(routes);

app.listen(8080, () => {
    console.log('Listening on: localhost:8080');
});
