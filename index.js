const express = require('express');
const app = express();
const port = 3000;
const { User } = require('./models');
const { Item } = require('./models');
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next();
}
const indexRouter = require('./routes/index');
app.use(logger);
app.use(express.json()) //untuk melakukan parsing app/json
app.use(express.urlencoded({ extended: false })); //untuk parsing x-www-urlencoded

app.use('/', indexRouter);
app.listen(port, () => console.log(`CRUD Challenge listening at http://localhost:${port}`));