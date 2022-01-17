const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine','pug');

var mainRouter = require('./routes/main');
var gameRouter = require('./routes/game');

app.use('/', mainRouter);
app.use('/game', gameRouter);

app.listen(3000, ()=>{console.log('connect')});