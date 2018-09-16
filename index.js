const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const index = require('./routes/index');
const todos = require('./routes/todos');
//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/v1/', todos);

app.listen(3000, function () {
    console.log("server runing on 3000 port");
});
