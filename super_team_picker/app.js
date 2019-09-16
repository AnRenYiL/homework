const express = require('express');
const logger = require('morgan');
const app = express();
const path = require('path');
const cohortsRouter = require('./routes/cohorts');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        const method = req.body._method
        return method;
    }
}));

app.use(logger('dev'));
app.set('view engine', 'ejs');
app.use("/cohorts", cohortsRouter);

const PORT = 6060;
const ADDRESS = '127.0.0.1';

app.listen(PORT, ADDRESS, () => {
    console.log(`EXPRESS server listening on ${ADDRESS}:${PORT}`);
});